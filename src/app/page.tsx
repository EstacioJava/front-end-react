'use client'
import ClientsPanel from "@/components/panels/clients";
import HomePanel from "@/components/panels/home";
import SettingsPanel from "@/components/panels/settings";
import StoragePanel from "@/components/panels/storage";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [users, setUsers] = useState('');
  const [activeTab, setActiveTab] = useState('storage');

  function changeTab (tabName: 'home' | 'storage' | 'settings' | 'clients') {
    setActiveTab(tabName);
  }

  function CurrentPanel () {
    if (activeTab === 'storage') {
      return <StoragePanel />
    } else if (activeTab === 'home') {
      return <HomePanel tab={activeTab} />
    } else if (activeTab === 'clients') {
      return <ClientsPanel tab={activeTab} />
    } else if (activeTab === 'settings') {
      return <SettingsPanel />
    }
  }

  return (
    <main className="flex flex-row h-full space-x-4">
      <aside className="h-full w-min rounded-lg shadow-lg space-y-2 p-2 bg-slate-50 dark:bg-slate-900">
        <Button className="w-full justify-start" onClick={() => changeTab('home')} variant={activeTab === 'home' ? 'secondary' : 'ghost'}>
          <i className="ti ti-home mr-2 text-2xl"></i> Início
        </Button>
        
        <Button className="w-full justify-start" onClick={() => changeTab('storage')} variant={activeTab === 'storage' ? 'secondary' : 'ghost'}>
          <i className="ti ti-packages mr-2 text-2xl"></i> Estoque
        </Button>
        
        <Button className="w-full justify-start" onClick={() => changeTab('clients')} variant={activeTab === 'clients' ? 'secondary' : 'ghost'}>
          <i className="ti ti-users mr-2 text-2xl"></i> Clientes
        </Button>
        
        {/* <Button className="w-full justify-start" onClick={() => changeTab('settings')} variant={activeTab === 'settings' ? 'secondary' : 'ghost'}>
          <i className="ti ti-settings mr-2 text-2xl"></i> Configurações
        </Button> */}
      </aside>

      <CurrentPanel />
    </main>
  );
}
