import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Client, Order } from "@/lib/types"
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"

interface ClientDialogProps extends React.HTMLAttributes<HTMLElement> {
   client: Client;
   orders: Array<Order>;
   isClientDataDialogOpen: boolean;
   setIsClientDataDialogOpen: Dispatch<SetStateAction<boolean>>;
} 

export default function ClientDialog ({ client, orders, setIsClientDataDialogOpen, isClientDataDialogOpen }: ClientDialogProps) {
   return (
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

                  <pre>{ JSON.stringify() }</pre>

                  {
                     orders.filter(({ clientID }) => clientID == client.id) == 0
                     ? <p className="font-medium text-muted-foreground">Nenhum pedido registrado</p>
                     : <Accordion type="single" collapsible className="w-full my-3">
                        { 
                           orders.map(order => {
                              if (order.clientID.toString() === client.id) {
                                 return (
                                    <AccordionItem value={ order.id.toString() } key={order.id}>
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
                                             <p data-delivery-status={Date.parse(order.deliveryDate) - Date.parse(new Date().toString()) >= ((10**8) * -1) ? 'valid' : 'expired'} className="delivery_date">{ new Date(order.deliveryDate.replace(/-/g, '\/')).toLocaleDateString('pt-BR') }</p>
                                          </div>
                                       </AccordionContent>
                                    </AccordionItem>
                                 )
                              }
                           }) 
                        }
                     </Accordion>
                  }
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
   )
}