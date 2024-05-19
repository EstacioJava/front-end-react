interface AlertDialogProps extends React.HTMLAttributes<HTMLElement> {
   isDialogOpen: boolean; // Prop to control dialog visibility
   setIsDialogOpen: Dispatch<SetStateAction<boolean>>; // Function to set dialog visibility
   getStorageItems: Function;
   itemID: string;
} 
import { 
   AlertDialogHeader, 
   AlertDialogFooter, 
   AlertDialog, 
   AlertDialogContent, 
   AlertDialogTitle, 
   AlertDialogDescription, 
   AlertDialogCancel, 
   AlertDialogAction
} from "@/components/ui/alert-dialog";
import { Item } from "@/lib/types";
import React from "react";
import { Dispatch, SetStateAction, useState } from "react";

export function DeleteItemAlertDialog(props: AlertDialogProps) {
   function deleteItem () {
    try {
       fetch(`http://localhost:8080/storage/${props.itemID}`, {
          method: 'DELETE',
       }).then(async (response) => {
          console.log(await response.json());
          console.log(`Item ${ props.itemID } deleted`);
          props.getStorageItems();
          props.setIsDialogOpen(false);
       })
    } catch (err) {
       console.error('Server not available');
    }
 }

   return (
     <AlertDialog open={props.isDialogOpen}>
       <AlertDialogContent>
         <AlertDialogHeader>
           <AlertDialogTitle>Você gostaria mesmo de excluir este item?</AlertDialogTitle>
           <AlertDialogDescription>
             Esta operação não pode ser desfeita.
           </AlertDialogDescription>
         </AlertDialogHeader>
         <AlertDialogFooter>
           <AlertDialogCancel onClick={() => props.setIsDialogOpen(false)}>Cancelar</AlertDialogCancel>
           <AlertDialogAction onClick={deleteItem}>Deletar</AlertDialogAction>
         </AlertDialogFooter>
       </AlertDialogContent>
     </AlertDialog>
   )
 }