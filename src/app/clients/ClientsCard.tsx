import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Client, Order } from "@/lib/types";
import { useState } from "react";
import ClientDialog from "./ClientDialog";

interface ClientsCardsProps extends React.HTMLAttributes<HTMLElement> {
   clients: Array<Client>;
   orders: Array<Order>;
} 

export default function ClientsCard ({ clients, orders }: ClientsCardsProps) {
   const [isClientDataDialogOpen, setIsClientDataDialogOpen] = useState(false);

   if (clients) {
      return clients.map(client => {
         return (
            <Card className="bg-transparent shadow-none border-2">
               <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-xl">{ client.name }</CardTitle>
                  <CardDescription>{ client.address }</CardDescription>
               </CardHeader>
      
               <CardContent className="p-4">
                  <ClientDialog client={client} isClientDataDialogOpen={isClientDataDialogOpen} orders={orders} setIsClientDataDialogOpen={setIsClientDataDialogOpen}/>
               </CardContent>
      
               <CardFooter className="flex justify-between p-4 pt-0">
                  <Button className="w-full" onClick={() => setIsClientDataDialogOpen(true)}>Dados</Button>
               </CardFooter>
            </Card>
         )
      })
   }
}