interface AddItemDialogProps extends React.HTMLAttributes<HTMLElement> {
   isDialogOpen: boolean; // Prop to control dialog visibility
   setIsDialogOpen: Dispatch<SetStateAction<boolean>>; // Function to set dialog visibility
   getStorageItems: Function;
} 

import { Dispatch, SetStateAction, useState } from "react";
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
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

export function AddItemDialog (props: AddItemDialogProps) {
   const [name, setName] = useState('');
   const [thickness, setThickness] = useState(0);
   const [length, setLength] = useState(0);
   const [width, setWidth] = useState(0);
   const [quantity, setQuantity] = useState(0);
   const [price, setPrice] = useState(0.0);

   function addItem () {
      fetch('http://localhost:8080/storage', {
         method: 'POST',
         body: JSON.stringify({
            name,
            thickness,
            length,
            width,
            quantity,
            price
         })
      }).then(() => {
         console.log('Item added!');
         props.getStorageItems();
         props.setIsDialogOpen(false);
      });
   }
   
   return (
      <Dialog open={props.isDialogOpen}>
         <DialogContent
            className="sm:max-w-[50rem]"
            onEscapeKeyDown={() => props.setIsDialogOpen(false)}
            onPointerDownOutside={() => props.setIsDialogOpen(false)}
         >
            <DialogHeader>
               <DialogTitle className="text-xl">Novo item</DialogTitle>
               <DialogDescription className="text-base">
                  Adicione um item ao estoque com base nas opções de materiais disponíveis.
               </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
               <div className="space-y-2">
                  <Label className="text-base">Material</Label>

                  <Select onValueChange={(v) => setName(v)}>
                     <SelectTrigger className="w-full">
                        <SelectValue className="text-base" placeholder="Selecione um material" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           <SelectLabel>Madeiras</SelectLabel>
                           <SelectItem value="MDF 3mm">MDF 3mm</SelectItem>
                           <SelectItem value="MDF 6mm">MDF 6mm</SelectItem>
                           <SelectItem value="MDF 8mm">MDF 8mm</SelectItem>
                           <SelectItem value="MDF 10mm">MDF 10mm</SelectItem>
                           <SelectItem value="MDF 18mm">MDF 18mm</SelectItem>
                        </SelectGroup>
                        
                        <SelectGroup>
                           <SelectLabel>Outros</SelectLabel>
                           <SelectItem value="cola_contato_3.6L">Cola contato 3,6 L</SelectItem>
                           <SelectItem value="corredica_light">Corrediça Light</SelectItem>
                        </SelectGroup>
                     </SelectContent>
                  </Select>
               </div>

               <div className="grid grid-cols-2 gap-x-2">
                  <div className="space-y-2 col-span-1">
                     <Label className="text-base">Largura (mm)</Label>
                     <Input onChange={({ target }) => setWidth(parseInt(target.value))} type="number" placeholder="60" />
                  </div>
                  
                  <div className="space-y-2 col-span-1">
                     <Label className="text-base">Comprimento (mm)</Label>
                     <Input onChange={({ target }) => setLength(parseInt(target.value))} type="number" placeholder="120" />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-x-2">
                  <div className="space-y-2 col-span-1">
                     <Label className="text-base">Preço (R$)</Label>
                     <Input onChange={({ target }) => setPrice(parseFloat(target.value))} type="number" placeholder="35,50" />
                  </div>
                  
                  <div className="space-y-2 col-span-1">
                     <Label className="text-base">Quantidade (un)</Label>
                     <Input onChange={({ target }) => setQuantity(parseInt(target.value))} type="number" placeholder="12" />
                  </div>
               </div>
            </div>

            <DialogFooter>
               <Button onClick={addItem} type="submit">Adicionar item</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}