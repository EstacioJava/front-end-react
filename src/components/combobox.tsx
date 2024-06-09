import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Item {
   value: string;
   label: string;
}

interface ComboboxProps {
   collection: Array<Item>;
   onValueChange: Function;
   empty: string;
   placeholder: string;
   className: string;
}

const Combobox = ({ collection, onValueChange, empty, placeholder, className }: ComboboxProps) => {
   const [open, setOpen] = useState(false);
   const [value, setValue] = useState('');

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger className={className} asChild>
            <Button
               variant="outline"
               role="combobox"
               className="w-[200px] justify-between"
            >
               {value ? collection.find((item) => item.value === value)?.label : placeholder}
               <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-[200px] p-0">
            <Command>
               <CommandInput placeholder={placeholder} className="h-9" />
               <CommandList>
                  <CommandEmpty>{ empty }</CommandEmpty>
                  <CommandGroup>
                     {collection.map((item: Item) => (
                        <CommandItem
                           key={item.value}
                           value={item.value}
                           onSelect={(currentValue) => {
                              onValueChange(currentValue);
                              setValue(currentValue);
                              setOpen(false);
                           }}
                        >
                           {item.label}
                           <CheckIcon className={cn( "ml-auto h-4 w-4", value === item.value ? "opacity-100" : "opacity-0" )} />
                        </CommandItem>
                     ))}
                  </CommandGroup>
               </CommandList>
            </Command>
         </PopoverContent>
      </Popover>
   )
}

export default Combobox;