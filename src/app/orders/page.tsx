'use client'

import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableFooter, TableCell, TableCaption } from "@/components/ui/table";
import { Client, OrderType } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import NewOrderDialog from "./NewOrderDialog";
import { Button } from "@/components/ui/button";

export default function Test() {
   const [isDatabaseLoading, setIsDatabaseLoading] = useState(false);
   const [isNewOrderDialogOpen, setIsNewOrderDialogOpen] = useState(false);
   const [orders, setOrders] = useState<Array<OrderType>>([]);
   const [currentOrder, setCurrentOrder] = useState<OrderType|null|undefined>();

   const [clients, setClients] = useState<Array<Client>>([]);

   function getOrders () {
      setIsDatabaseLoading(true);
      fetch('http://localhost:8080/orders')
      .catch(err => {
         toast.error('Não foi possível se conectar ao Banco de Dados');
         console.error('[ERROR] Unable to fetch /orders', err);
      }).then((response) => {
         if (response) {
            return response.json();
         }
      }).then((data) => {
         if (data) {
            setOrders(data);
            console.log(data);
         } else {
            console.error('[ERROR] No data found when fetching /orders');
         }
         setIsDatabaseLoading(false);
      })
   }

   function getClients() {
      fetch('http://localhost:8080/clients')
      .then((response) => response.json())
      .then((data) => {
         setClients(data);
         console.log('CLIENTS', data);
      })
   }

   function openOrderDialog(order?: OrderType) {
      console.log(order);
      setCurrentOrder(order);
      setIsNewOrderDialogOpen(true);
   }

   useEffect(() => {
      getOrders();
      getClients();
   }, [])

   const Order = (order: OrderType) => {
      return (
         <TableRow>
            <TableCell className="font-medium">
               <Badge data-status={order.status} className="order_badge text-sm">{ order.status.replace(/-/g, ' ') }</Badge>
            </TableCell>
            <TableCell className="font-medium">
               <div className="flex flex-col">
                  <span className="whitespace-nowrap">{ 
                        clients 
                        && clients.find(client => client.id === order.clientID.toString())?.name 
                        || 'Cliente não encontrado' 
                  }</span>
                  <span className="text-sm text-muted-foreground">{ 
                     clients 
                     && clients.find(client => client.id === order.clientID.toString())?.cpf?.replace(/(.{3})(.{3})(.{3})(.{2})/g, '$1.$2.$3-$4') || '' 
                  }</span>
               </div>
            </TableCell>
            <TableCell className="font-medium capitalize overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[26rem]">{ order.description }</TableCell>
            <TableCell className="font-medium">{ new Date(order.orderDate.replace(/-/g, '\/')).toLocaleDateString('pt-BR') }</TableCell>
            <TableCell className="font-medium delivery_date" data-delivery-status={Date.parse(order.deliveryDate) - Date.parse(new Date().toString()) >= ((10**8) * -1) ? 'valid' : 'expired'}>{ new Date(order.deliveryDate.replace(/-/g, '\/')).toLocaleDateString('pt-BR') }</TableCell>
            <TableCell className="font-medium">{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.finalPrice) }</TableCell>
            <TableCell className="font-medium">
               <Button onClick={() => openOrderDialog(order)} className="hover:bg-primary hover:text-neutral-50" variant="ghost" size="icon"><i className="ti ti-receipt text-xl" /></Button>
            </TableCell>
         </TableRow>
      )
   }

   return (
      <section className="flex flex-col h-full w-full rounded-lg shadow-lg p-5 bg-slate-50 dark:bg-slate-900">
         <div className="flex flex-row justify-between mb-4">
            <h1 className="text-3xl font-semibold">Pedidos</h1>
         </div>

         <section className="border-2 border-slate-200 dark:border-slate-900 p-3 rounded-lg">
            <div className="flex flex-row justify-between">
               <h2 className="text-2xl font-semibold">Pedidos</h2>
               
               <Button onClick={() => openOrderDialog()} size="icon" variant="ghost">
                  <i className="ti ti-square-rounded-plus text-2xl"></i>
               </Button>
            </div>

            <Table className="text-base">
               <TableHeader>
                  <TableRow>
                     <TableHead>Status</TableHead>
                     <TableHead>Cliente</TableHead>
                     <TableHead>Descrição</TableHead>
                     <TableHead>Data do Pedido</TableHead>
                     <TableHead>Prazo de Entrega</TableHead>
                     <TableHead>Preço</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {
                     orders.map(order => <Order key={order.id} clientID={order.clientID} id={order.id} status={order.status} description={order.description} deliveryDate={order.deliveryDate} orderDate={order.orderDate} finalPrice={order.finalPrice} />)
                  }
               </TableBody>
               <TableFooter>
                  <TableRow>
                     <TableCell className="text-muted-foreground">{ orders.length } Pedidos</TableCell>
                  </TableRow>
               </TableFooter>
               <TableCaption className="text-base">Todos os materiais em estoque</TableCaption>
            </Table>

            <NewOrderDialog order={currentOrder} isNewOrderDialogOpen={isNewOrderDialogOpen} setIsNewOrderDialogOpen={setIsNewOrderDialogOpen} />
         </section>
      </section>
   )
}