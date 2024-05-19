interface AddMaterialDialogProps extends React.HTMLAttributes<HTMLElement> {
   isDialogOpen: boolean; // Prop to control dialog visibility
   setIsDialogOpen: Dispatch<SetStateAction<boolean>>; // Function to set dialog visibility
} 

import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle
} from "@/components/ui/dialog";

export function AddMaterialDialog (props: AddMaterialDialogProps) {
   function addItem () {

   }
   
   return (
      <Dialog open={props.isDialogOpen}>
         <DialogContent
            className="sm:max-w-[50rem]"
            onEscapeKeyDown={() => props.setIsDialogOpen(false)}
            onPointerDownOutside={() => props.setIsDialogOpen(false)}
         >
            <DialogHeader>
               <DialogTitle className="text-xl">Novo material</DialogTitle>
               <DialogDescription className="text-base">
                  Adicione um material à lista de materiais.
               </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
               <div className="grid grid-cols-2 gap-x-2">
                  <div className="space-y-2 col-span-1">
                     <Label className="text-base">Nome</Label>
                     <Input type="text" placeholder="MDF" />
                  </div>
                  
                  <div className="space-y-2 col-span-1">
                     <Label className="text-base">Espessura (mm)</Label>
                     <Input type="number" placeholder="6" />
                  </div>
               </div>
            </div>

            <DialogFooter>
               <Button onClick={() => props.setIsDialogOpen(false)} type="submit">Adicionar material</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}