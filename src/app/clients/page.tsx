'use client'

import { useEffect, useState } from "react";
import { Client, Order } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import './style.css';
import ClientsCards from "./ClientsCard";
import ClientDialog from "./ClientDialog";

export default function ClientsPanel (tab: string) {
   const [clients, setClients] = useState<Array<Client>>([]);
   const [orders, setOrders] = useState<Array<Order>>([]);
   const { toast } = useToast();
   const locationTypes = {
      house: 'Casa',
      apartment: 'Apartamento',
      building: 'Estabelecimento'
   }

   function getClients () {
      fetch('http://localhost:8080/clients')
      .then(response => response.json())
      .then(data => {
         setClients(data);
      });

      fetch('http://localhost:8080/orders')
      .then(response => response.json())
      .then(data => {
         setOrders(data);
      });
   
      // setClients([
      //    {
      //       name: 'Henry',
      //       cpf: "10020030069",
      //       cel: "48996124030",
      //       email: "henry@gmail.com",
      //       address: 'R. Profa. Maria Madalena Moura Ferro, 147 - Estreito, Florianópolis - SC, 88070-320',
      //       orders: []
      //    },
      //    {
      //       name: 'Carlos',
      //       cpf: "98764531224",
      //       cel: "48961681221",
      //       email: "carlos@gmail.com",
      //       address: 'Rua Menino Deus, 173 - Centro, Florianópolis - SC, 88020-210',
      //       orders: []
      //    }
      // ]);

   //    {
   //       "name": "Henry Bastos",
   //       "cpf": 12345678911,
   //       "email": "henry@gmail.com",
   //       "phone":"48911112222",
   //       "address": "Rua Menino Deus, 173 - Centro, Florianópolis - SC, 88020-210",
   //       "orders": "[1,3]"
   //   },
   //   {
   //      "name": "Carlos",
   //      "cpf": 98765432122,
   //      "email": "carlos@yahoo.com",
   //      "phone":"48933334444",
   //      "address": "R. Profa. Maria Madalena Moura Ferro, 147 - Estreito, Florianópolis - SC, 88070-320",
   //      "orders": "[2,4]"
   //    }
   }

   useEffect(() => {
      getClients();
      // toast({ title: 'Servidor inoperante.' });
   }, [tab]);
   
   return (
      <section className="flex flex-col h-full w-full rounded-lg shadow-lg bg-slate-50 p-5 space-y-4">
         <div className="flex flex-row justify-between">
            <h1 className="text-3xl font-semibold">Início</h1>
         </div>

         <section className="border-2 border-slate-200 dark:border-slate-900 p-3 rounded-lg">
            <h2 className="text-2xl font-semibold">Clientes</h2>

            <div className="grid grid-cols-3 grid-rows-[auto] gap-4 mt-3">
               <ClientsCards clients={clients} orders={orders} />
            </div>
         </section>

         {/* <ClientDataDialog client={clientDialogData} /> */}
      </section>
   )
}