import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Client } from "@/lib/types";

export default function ClientsPanel (tab: string) {
   const [clients, setClients] = useState<Array<Client>>([]);
   const [isClientDataDialogOpen, setIsClientDataDialogOpen] = useState(false);
   const [clientDialogData, setClientDialogData] = useState({});

   function getClients () {
      setClients([
         {
            name: 'Henry Bastos da Silva',
            address: {
               street: 'Rua Menino Deus',
               number: 173,
               neiborghood: 'Centro',
               city: 'Florianópolis',
               state: 'SC',
               type: 'building',
               postal_code: '88020-210',
            },
            contact: {
               phone: '(48) 99612-4030',
               email: '',
            },
            id: {
               type: 'cpf',
               value: '100.200.300-69'
            }
         }
      ]);
   }

   useEffect(() => {
      getClients();
   }, [tab]);

   function openClientDialog (client: Client) {
      setClientDialogData(client);
      setIsClientDataDialogOpen(true);
   }

   function ClientCard () {
      if (clients) {
         return clients.map(client => {
            return (
               <Card className="bg-transparent shadow-none border-2">
                  <CardHeader className="p-4 pb-0">
                     <CardTitle className="text-xl">{ client.name }</CardTitle>
                     <CardDescription>{ client.address.neiborghood }, { client.address.city } - { client.address.postal_code }</CardDescription>
                  </CardHeader>
      
                  <CardContent className="p-4">
                     <p><b>Pedidos:</b> 2</p>
                  </CardContent>
      
                  <CardFooter className="flex justify-between p-4 pt-0">
                     <Button className="w-full" onClick={() => openClientDialog(client)}>Dados</Button>
                  </CardFooter>
               </Card>
            )
         })
      }
   }

   function ClientDataDialog (client: Client) {
      return (
         <Dialog open={isClientDataDialogOpen}>
            <DialogContent onPointerDownOutside={() => setIsClientDataDialogOpen(false)}>
               <DialogHeader>
                  <DialogTitle>{ client.name }</DialogTitle>
               </DialogHeader>

               <DialogFooter>
                  <Button onClick={() => setIsClientDataDialogOpen(false)}>Fechar</Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      )
   }
   
   return (
      <section className="flex flex-col h-full w-full rounded-lg shadow-lg bg-slate-50 p-5 space-y-4">
         <div className="flex flex-row justify-between">
            <h1 className="text-3xl font-semibold">Início</h1>
         </div>

         <section className="border-2 border-slate-200 dark:border-slate-900 p-3 rounded-lg">
            <h2 className="text-2xl font-semibold">Clientes</h2>

            <div className="grid grid-cols-3 grid-rows-[auto] gap-4 mt-3">
               <ClientCard />
               <ClientCard />
               <ClientCard />
            </div>
         </section>

         <ClientDataDialog client={clientDialogData} />
      </section>
   )
}