import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Client, OrderType } from "@/lib/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

interface NewOrderDialogProps {
   order: OrderType | null | undefined;
   isNewOrderDialogOpen: boolean;
   setIsNewOrderDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NewOrderDialog({ isNewOrderDialogOpen, setIsNewOrderDialogOpen, order }: NewOrderDialogProps) {
   const [status, setStatus] = useState('');
   const [description, setDescription] = useState('');
   const [deliveryDate, setDeliveryDate] = useState('');
   const [price, setPrice] = useState(0);
   const [clientID, setClientID] = useState(0);

   const [isConfirmDeleteOrderOpen, setIsConfirmDeleteOrderOpen] = useState(false);
   const [clients, setClients] = useState<Array<Client>>([]);
   
   const STATUSES = [
      'em-planejamento',
      'em-andamento',
      'entregue',
      'suspenso'
   ]

   function updateOrder () {
      fetch(`http://localhost:8080/orders/${order.id}`, {
         method: 'PUT',
         body: JSON.stringify({
            clientID,
            description,
            finalPrice: price,
            deliveryDate: deliveryDate.replace(/(.*)\/(.*)\/(.*)/g, '$3-$2-$1'),
            orderDate: order?.orderDate,
            status
         })
      }).then(response => response.json())
      .then(data => {
         toast.success(`Pedido ${ order.id } atualizado!`);
      });

      setIsNewOrderDialogOpen(false);
      window.location.reload();
   }

   function submitNewOrder() {
      fetch(`http://localhost:8080/orders`, {
         method: 'POST',
         body: JSON.stringify({
            clientID,
            description,
            finalPrice: price,
            deliveryDate: deliveryDate.replace(/(.*)\/(.*)\/(.*)/g, '$3-$2-$1'),
            orderDate: new Date().toLocaleDateString('pt-BR').replace(/(.*)\/(.*)\/(.*)/g, '$3-$2-$1'),
            status,
         })
      })
      .then(response => response.json())
      .then(data => {
         console.log('New order', data);
         // toast.success(`Novo pedido registrado`);
         window.location.reload();
      })
   }

   function deleteOrder () {
      fetch(`http://localhost:8080/orders/${ order?.id }`, {
         method: 'DELETE'
      });
      // toast.success(`Pedido deletado com sucesso!`);
      setIsNewOrderDialogOpen(false);
      setIsConfirmDeleteOrderOpen(false);
      window.location.reload();
   }

   useEffect(() => {
      if (isNewOrderDialogOpen) {
         if (order) {
            setDescription(order.description);
            setStatus(order.status);
            setPrice(order.finalPrice);
            setClientID(order.clientID);
            setDeliveryDate(new Date(order.deliveryDate.replace(/-/g, '\/')).toLocaleDateString('pt-BR'));
         } else {
            setDescription('');
            setStatus('');
            setPrice(0);
            setDeliveryDate(new Date().toLocaleDateString('pt-BR'));
         }

         fetch('http://localhost:8080/clients')
         .then(response => response.json())
         .then(data => {
            setClients(data);
            console.log(data);
         });
      }
   }, [isNewOrderDialogOpen])

   return (
      <Dialog onOpenChange={(v) => setIsNewOrderDialogOpen(v)} open={isNewOrderDialogOpen}>
         <DialogContent className="max-w-[50rem]" onPointerDownOutside={() => setIsNewOrderDialogOpen(false)}>
            <DialogHeader className="flex flex-row items-center">
               { order
                  ? <DialogTitle className="text-2xl font-semibold mr-3">Atualizar pedido</DialogTitle>
                  : <DialogTitle className="text-2xl font-semibold">Novo pedido</DialogTitle>
               }

               { order && 
                  <Button title="Deletar pedido" className="hover:text-red-600" onClick={() => setIsConfirmDeleteOrderOpen(true)} size="icon" variant="ghost">
                     <i className="ti ti-trash text-xl"></i>
                  </Button> 
               }
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3 mb-3">
               <div>
                  <Label>Descrição</Label>
                  <Input value={description} onChange={({ target }) => setDescription(target.value)} type="text" />
               </div>

               <div>
                  <Label>Prazo de entrega</Label>
                  <Input value={deliveryDate} onChange={({ target }) => setDeliveryDate(target.value)} type="text" />
               </div>

               <div>
                  <Label>Preço</Label>
                  <Input value={price} onChange={({ target }) => setPrice(target.value)} type="number" />
               </div>

               <div>
                  <Label>Status</Label>
                  <Select onValueChange={(v) => setStatus(v)}>
                     <SelectTrigger className="w-full mt-1">
                        <Badge data-status={status} className="order_badge text-sm">{ status.replace(/-/g, ' ') }</Badge>
                     </SelectTrigger>
                     <SelectContent>
                        { STATUSES.map(stat => 
                           <SelectItem key={stat} value={stat}>
                              <Badge data-status={stat} className="order_badge text-sm">{ stat.replace(/-/g, ' ') }</Badge>
                           </SelectItem>
                        ) }
                     </SelectContent>
                  </Select>
               </div>
               
               <div className="col-span-full">
                  <Label>Cliente</Label>
                  <Select onValueChange={(v) => setClientID(Number(v))}>
                     <SelectTrigger className="w-full text-base mt-1">
                        { 
                           clientID
                           ? clients.find(client => client.id == clientID.toString()) 
                              ? <span className="font-medium">{ clients.find(client => client.id == clientID.toString())?.name } <span className="text-muted-foreground text-sm">{ clients.find(client => client.id == clientID.toString())?.cpf }</span></span>
                              : 'Cliente não encontrado'
                           : 'Escolha um cliente'
                        }
                     </SelectTrigger>
                     <SelectContent>
                        { clients && clients.map(client => 
                           <SelectItem className="text-base" key={client.id} value={client.id}>
                              <span className="font-medium">{ client.name }</span> - <span className="text-muted-foreground text-sm">{ client.cpf.replace(/(.{3})(.{3})(.{3})(.{2})/g, '$1.$2.$3-$4') }</span>
                           </SelectItem>
                        ) }
                     </SelectContent>
                  </Select>
               </div>
            </div>

            <AlertDialog open={isConfirmDeleteOrderOpen}>
               <AlertDialogContent>
                  <AlertDialogHeader>
                     <AlertDialogTitle>Você gostaria de deletar o pediddo { order?.description }?</AlertDialogTitle>
                     <AlertDialogDescription>Esta operação não pode ser desfeita.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                     <AlertDialogCancel onClick={() => setIsConfirmDeleteOrderOpen(false)}>Cancelar</AlertDialogCancel>
                     <AlertDialogAction asChild>
                        <Button variant="destructive" onClick={deleteOrder}>Deletar</Button>
                     </AlertDialogAction>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialog>

            <DialogFooter>
               { order
                  ? <Button onClick={updateOrder}>Atualizar pedido</Button>
                  : <Button onClick={submitNewOrder}>Adicionar pedido</Button>
               }
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}