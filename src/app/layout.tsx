'use client'

// import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

// export const metadata: Metadata = {
//   title: "Gerenciador de Estoque"
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  // const [users, setUsers] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  function changeTab (tabName: 'home' | 'storage' | 'settings' | 'clients') {
    router.push(tabName);
  }

  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"  
          disableTransitionOnChange
          enableSystem
        >
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

            {children}
            {/* <CurrentPanel /> */}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
