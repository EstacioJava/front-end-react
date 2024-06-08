import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

interface NewClientDialogProps {
   isAddClientDialogOpen: boolean;
   setIsAddClientDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NewClientDialog ({ isAddClientDialogOpen, setIsAddClientDialogOpen }: NewClientDialogProps) {
   return (
      <Dialog onOpenChange={(v) => setIsAddClientDialogOpen(v)} open={isAddClientDialogOpen}>
         <DialogContent className="max-w-[50rem]" onPointerDownOutside={() => setIsAddClientDialogOpen(false)}>
            <DialogHeader>
               <DialogTitle className="text-2xl font-semibold">Novo cliente</DialogTitle>
            </DialogHeader>
         </DialogContent>
      </Dialog>
   )
}