'use client'
// import ClientsPanel from "@/components/panels/clients";
// import HomePanel from "@/components/panels/home";
// import SettingsPanel from "@/components/panels/settings";
// import StoragePanel from "@/app/pages/storage";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  // const [users, setUsers] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  function changeTab (tabName: 'home' | 'storage' | 'settings' | 'clients') {
    router.push('/storage');
  }

  // function CurrentPanel () {
  //   if (activeTab === 'storage') {
  //     return <StoragePanel />
  //   } else if (activeTab === 'home') {
  //     return <HomePanel tab={activeTab} />
  //   } else if (activeTab === 'clients') {
  //     return <ClientsPanel tab={activeTab} />
  //   } else if (activeTab === 'settings') {
  //     return <SettingsPanel />
  //   }
  // }

  return (
    <main className="flex flex-row h-full space-x-4">
    </main>
  );
}
