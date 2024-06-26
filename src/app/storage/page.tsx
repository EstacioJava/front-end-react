'use client'

import { Item } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableFooter,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AddItemDialog } from "./AddItemDialog";
import { AddMaterialDialog } from "./AddMaterialDialog";
import { 
   DropdownMenu, 
   DropdownMenuContent, 
   DropdownMenuItem, 
   DropdownMenuLabel, 
   DropdownMenuSeparator, 
   DropdownMenuShortcut, 
   DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { DeleteItemAlertDialog } from "./DeleteItemAlertDialog";

export default function Storage() {
   const [errorOnFetchingStorage, setErrorOnFetchingStorage] = useState(false);
   const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
   const [storage, setStorage] = useState([]);
   const [isDatabaseLoading, setIsDatabaseLoading] = useState(false);
   const [isAddMaterialDialogOpen, setIsAddMaterialDialogOpen] = useState(false);
   const [isDeleteItemAlertDialogOpen, setIsDeleteItemAlertDialogOpen] = useState(false);
   const [deleteItemID, setDeleteItemID] = useState('');

   useEffect(() => {
      console.log('Mounted');
      getStorageItems();
   }, []);

   function getStorageItems () {
      fetch('http://localhost:8080/storage', {
         method: 'GET',
      }).catch(err => {
         console.error('[ERROR] Unable to fetch /storage');
         console.error(err);
         setErrorOnFetchingStorage(true);
      }).then((response) => {
         if (response) {
            return response.json();
         }
      }).then((data) => {
         if (data) {
            setStorage(data);
            setErrorOnFetchingStorage(false);
         } else {
            console.error('[ERROR] No data found when fetching /storage');
         }
         setIsDatabaseLoading(false);
      })
   }

   function deleteItem({ id }: { id: string }) {
      setDeleteItemID(id);
      setIsDeleteItemAlertDialogOpen(true);
   }

   function StorageItems () {
      if (isDatabaseLoading) {
         return (<>
               <TableRow key="db_loading_row_1">
                  <TableCell className="font-medium">
                     <Skeleton className="w-full h-6 bg-slate-200" />
                  </TableCell>
                  <TableCell className="font-medium">
                     <Skeleton className="w-full h-6 bg-slate-200" />
                  </TableCell>
                  <TableCell className="font-medium">
                     <Skeleton className="w-full h-6 bg-slate-200" />
                  </TableCell>
                  <TableCell className="font-medium">
                     <Skeleton className="w-full h-6 bg-slate-200" />
                  </TableCell>
                  <TableCell className="font-medium">
                     <Skeleton className="w-full h-6 bg-slate-200" />
                  </TableCell>
                  <TableCell className="font-medium">
                     <Skeleton className="w-full h-6 bg-slate-200" />
                  </TableCell>
                  <TableCell className="font-medium">
                     <Skeleton className="w-full h-6 bg-slate-200" />
                  </TableCell>
               </TableRow>

               <TableRow key="db_loading_row_2">
                  <TableCell className="font-medium">
                     <Skeleton className="w-full h-6 bg-slate-200" />
                  </TableCell>
                  <TableCell className="font-medium">
                     <Skeleton className="w-full h-6 bg-slate-200" />
                  </TableCell>
                  <TableCell className="font-medium">
                     <Skeleton className="w-full h-6 bg-slate-200" />
                  </TableCell>
                  <TableCell className="font-medium">
                     <Skeleton className="w-full h-6 bg-slate-200" />
                  </TableCell>
                  <TableCell className="font-medium">
                     <Skeleton className="w-full h-6 bg-slate-200" />
                  </TableCell>
                  <TableCell className="font-medium">
                     <Skeleton className="w-full h-6 bg-slate-200" />
                  </TableCell>
                  <TableCell className="font-medium">
                     <Skeleton className="w-full h-6 bg-slate-200" />
                  </TableCell>
               </TableRow>
            </>)
      } else if (errorOnFetchingStorage) {
         <TableRow>
            <TableCell className="font-medium">-</TableCell>
            <TableCell className="font-medium">-</TableCell>
            <TableCell className="font-medium">-</TableCell>
            <TableCell className="font-medium">-</TableCell>
            <TableCell className="font-medium">-</TableCell>
            <TableCell className="font-medium">-</TableCell>
            <TableCell className="font-medium">-</TableCell>
         </TableRow>
      } else {
         return storage.map((item: Item) => {
            return (
               <TableRow key={item.id}>
                  <TableCell className="font-medium">{ item.name }</TableCell>
                  <TableCell className="font-medium">R$ { item.price }</TableCell>
                  <TableCell className="font-medium">{ item.width }</TableCell>
                  <TableCell className="font-medium">{ item.length }</TableCell>
                  <TableCell className="font-medium">{ item.quantity }</TableCell>
                  <TableCell className="font-medium">{ item.thickness }</TableCell>
                  <TableCell className="flex flex-row font-medium justify-center">
                  <DropdownMenu>
                     <DropdownMenuTrigger>
                        <i className="ti ti-dots-vertical text-xl"></i>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>{ item.name }</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => deleteItem(item)} className="text-red-600">Remover item</DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
                  </TableCell>
               </TableRow>
            )
         })
      }
   }

   return (
      <section className="flex flex-col h-full w-full rounded-lg shadow-lg p-5 bg-slate-50 dark:bg-slate-900">
         <div className="flex flex-row justify-between mb-4">
            <h1 className="text-3xl font-semibold">Estoque</h1>
         </div>

         <section className="border-2 border-slate-200 dark:border-slate-900 p-3 rounded-lg">
            <div className="flex flex-row justify-between">
               <h2 className="text-2xl font-semibold">Itens</h2>
               
               <Button onClick={() => setIsAddItemDialogOpen(true)} size="icon" variant="ghost">
                  <i className="ti ti-square-rounded-plus text-2xl"></i>
               </Button>
            </div>

            <Table className="text-base">
               <TableHeader>
                  <TableRow>
                     <TableHead>Material</TableHead>
                     <TableHead>Preço (R$)</TableHead>
                     <TableHead>Largura (cm)</TableHead>
                     <TableHead>Comprimento (cm)</TableHead>
                     <TableHead>Quantidade</TableHead>
                     <TableHead>Espessura (mm)</TableHead>
                     <TableHead className="w-fit"></TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  <StorageItems />
               </TableBody>
               <TableFooter>
                  <TableRow>
                     {
                        storage.length > 1 
                        ? <TableCell>Total: { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(storage.reduce((a,b) => a.price + b.price))  }</TableCell>
                        : storage.length > 0 && <TableCell>Total: { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(storage[0].price)  }</TableCell>
                     }
                     {/* <TableCell>Total: { storage.reduce((a, b) => a.price + b.price) }</TableCell> */}
                  </TableRow>
               </TableFooter>
               <TableCaption className="text-base">Todos os materiais em estoque</TableCaption>
            </Table>

            <AddItemDialog getStorageItems={getStorageItems} isDialogOpen={isAddItemDialogOpen} setIsDialogOpen={setIsAddItemDialogOpen} />
            <AddMaterialDialog isDialogOpen={isAddMaterialDialogOpen} setIsDialogOpen={setIsAddMaterialDialogOpen}/>
            <DeleteItemAlertDialog itemID={deleteItemID} getStorageItems={getStorageItems} setIsDialogOpen={setIsDeleteItemAlertDialogOpen} isDialogOpen={isDeleteItemAlertDialogOpen} />

            {/* <Button variant="secondary" className="text-base w-min" onClick={() => setIsAddItemDialogOpen(true)}>Cadastrar item</Button> */}
         </section>
      </section>
   )
}