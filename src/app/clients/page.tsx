'use client'

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { Client, Order } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import './style.css';
import NewClientDialog from "./NewClientDialog";
import ClientCard from "./ClientCard";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function ClientsPanel (tab: string) {
   const [clients, setClients] = useState<Array<Client>>([]);
   const [orders, setOrders] = useState<Array<Order>>([]);
   const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
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

   function ClientsCards () {
      if (clients) {
         return clients.map(client => {
            const [isClientDataDialogOpen, setIsClientDataDialogOpen] = useState(false);

            return (
               <>
                  <Card className="bg-transparent shadow-none border-2">
                     <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-xl">{ client.name }</CardTitle>
                        <CardDescription>{ client.address }</CardDescription>
                     </CardHeader>
         
                     <CardContent className="p-4">
                        <p>
                           {/* <b>Pedidos:</b> { client.orders.length } */}
                        </p>
                     </CardContent>
         
                     <CardFooter className="flex justify-between p-4 pt-0">
                        <Button className="w-full" onClick={() => setIsClientDataDialogOpen(true)}>Dados</Button>
                     </CardFooter>
                  </Card>

                  <Dialog onOpenChange={(v) => setIsClientDataDialogOpen(v)} open={isClientDataDialogOpen}>
                     <DialogContent className="max-w-[50rem]" onPointerDownOutside={() => setIsClientDataDialogOpen(false)}>
                        <DialogHeader>
                           <DialogTitle className="text-2xl font-semibold">{ client.name }</DialogTitle>
                        </DialogHeader>

                        <div className="flex flex-row w-full justify-between">
                           <div>
                              <h3 className="text-lg font-semibold">CPF</h3>
                              <p className="text-slate-500">{ client.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/g, '$1.$2.$3-$4') }</p>
                           </div>

                           <div>
                              <h3 className="text-lg font-semibold">E-mail</h3>
                              <p className="text-slate-500">{ client.email }</p>
                           </div>

                           <div>
                              <h3 className="text-lg font-semibold">Telefone</h3>
                              <p className="text-slate-500">{ client.phone.replace(/^(\d{2})(\d{1})?(\d{4})(\d{4})$/g, '($1) $2$3-$4') }</p>
                           </div>
                        </div>

                        <div className="flex flex-row w-full justify-between">
                           <div className="w-full">
                              <h3 className="text-lg font-semibold">Pedidos</h3>

                              <Accordion type="single" collapsible className="w-full my-3">
                                 { orders.map(order => {
                                    if (order.clientID.toString() === client.id) {
                                       return (
                                          <AccordionItem value={ order.id.toString() }>
                                             <AccordionTrigger className="w-full hover:bg-neutral-100 hover:no-underline text-lg capitalize px-2 py-3">
                                                <div className="flex flex-row">
                                                   <div className="flex flex-row justify-end w-[9rem] mr-3">
                                                      <Badge data-status={order.status} className="badge text-sm">{ order.status.replace(/-/g, ' ') }</Badge>
                                                   </div>
                                                   <span title={order.description} className="max-w-[30rem] text-left whitespace-nowrap overflow-hidden overflow-ellipsis">{ order.description }</span>
                                                </div>
                                             </AccordionTrigger>
                                             <AccordionContent className="flex flex-row justify-between p-3">
                                                <div className="flex flex-col text-base">
                                                   <span className="text-sm font-bold">Preço</span>
                                                   <p>{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.finalPrice) }</p>
                                                </div>
                                                
                                                <div className="flex flex-col text-base">
                                                   <span className="text-sm font-bold">Data do pedido</span>
                                                   <p>{ new Date(order.orderDate.replace(/-/g, '\/')).toLocaleDateString('pt-BR') }</p>
                                                </div>

                                                <div className="flex flex-col text-base">
                                                   <span className="text-sm font-bold">Prazo de entrega</span>
                                                   <p data-delivery-status={Date.parse(order.deliveryDate) - Date.parse(new Date().toString()) >= ((96 * (10**6)) * -1) ? 'valid' : 'expired'} className="delivery_date">{ new Date(order.deliveryDate.replace(/-/g, '\/')).toLocaleDateString('pt-BR') }</p>
                                                </div>
                                             </AccordionContent>
                                          </AccordionItem>
                                       )
                                    }
                                 }) }
                              </Accordion>
                           </div>
                        </div>

                        <div className="space-y-3">
                           <div>
                              <h3 className="text-lg font-semibold">Endereço</h3>
                              <p className="text-slate-500">{ client.address }</p>
                           </div>

                           <Button asChild>
                              <Link target="_blank" href={`https://www.google.com.br/maps/place/${encodeURIComponent(client.address)}`}>
                                 <i className="ti ti-map-pin text-xl mr-2"></i>
                                 Ver localização
                              </Link>
                           </Button>
                        </div>

                        <DialogFooter>
                           <Button onClick={() => setIsClientDataDialogOpen(false)}>Fechar</Button>
                        </DialogFooter>
                     </DialogContent>
                  </Dialog>
               </>
            )
         })
      }
   }
   
   return (
      <section className="flex flex-col h-full w-full rounded-lg shadow-lg bg-slate-50 p-5 space-y-4">
         <div className="flex flex-row justify-between">
            <h1 className="text-3xl font-semibold">Clientes</h1>
         </div>

         <section className="border-2 border-slate-200 dark:border-slate-900 p-3 rounded-lg">
            <div className="flex flex-row justify-between">
               <h2 className="text-2xl font-semibold">Clientes</h2>
               <Button onClick={() => setIsAddClientDialogOpen(true)} size="icon" variant="ghost">
                  <i className="ti ti-square-rounded-plus text-2xl"></i>
               </Button>
            </div>

            <Popover>
               <PopoverTrigger>Open</PopoverTrigger>
               <PopoverContent align="start" className="max-w-[12rem] max-h-[8rem] overflow-x-auto p-0">
                  <Button size="sm" variant="ghost" className="w-full justify-start">A</Button>
                  <Button size="sm" variant="ghost" className="w-full justify-start">A</Button>
                  <Button size="sm" variant="ghost" className="w-full justify-start">A</Button>
                  <Button size="sm" variant="ghost" className="w-full justify-start">A</Button>
                  <Button size="sm" variant="ghost" className="w-full justify-start">A</Button>
                  <Button size="sm" variant="ghost" className="w-full justify-start">A</Button>
                  <Button size="sm" variant="ghost" className="w-full justify-start">A</Button>
                  <Button size="sm" variant="ghost" className="w-full justify-start">A</Button>
                  <Button size="sm" variant="ghost" className="w-full justify-start">A</Button>
                  <Button size="sm" variant="ghost" className="w-full justify-start">A</Button>
                  <Button size="sm" variant="ghost" className="w-full justify-start">A</Button>
               </PopoverContent>
            </Popover>

            <div className="grid grid-cols-3 grid-rows-[auto] gap-4 mt-3">
               { clients.map(client => <ClientCard client={client} orders={orders} key={client.id} />) }
            </div>
         </section>
         {/* <ClientDataDialog client={clientDialogData} /> */}
         <NewClientDialog isAddClientDialogOpen={isAddClientDialogOpen} setIsAddClientDialogOpen={setIsAddClientDialogOpen} />
      </section>
   )
}