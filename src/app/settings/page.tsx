'use client'

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { useState } from "react";

export default function SettingsPanel () {
   const { setTheme } = useTheme();
   const [checked, setChecked] = useState(false);
   
   function toggleTheme (value: boolean) {
      setChecked(value);
      if (value) {
         setTheme('dark');
      } else {
         setTheme('light');
      }
   }

   return (
      <section className="flex flex-col h-full w-full rounded-lg shadow-lg p-5 bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-row justify-between">
            <h1 className="text-3xl font-semibold">Configurações</h1>

            <Label htmlFor="toggle_theme_switch" />
            <Switch id="toggle_theme_switch" checked={checked} onCheckedChange={toggleTheme} />
         </div>
      </section>
   )
}