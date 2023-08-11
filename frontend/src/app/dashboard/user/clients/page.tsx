'use client'
import { Card, Title } from '@tremor/react';
import Search from '../../../components/dashboard/search';
import UsersTable from '../../../components/dashboard/table';
import AddButton from '@/app/components/dashboard/addButton';
import { useEffect, useState } from 'react';
import { Client } from '@/../types/client';

export const dynamic = 'force-dynamic';

export default function Clients({
  searchParams,
}: {
  searchParams: { q: string };
}) {
   const [clients, setClients] = useState<Client[]>([]);
   useEffect(() => {
      
      (async () => {
         const _clients = await fetch('/dashboard/user/clients/api')
         setClients((await _clients.json()).clients)
      })()
      
   }, []);
   const search = searchParams.q ?? '';
   clients?.filter((client) => {
         if (!search) return true;
         if (client.name.toLowerCase().includes(search.toLowerCase())) {
            console.log(client.name)
            return true;
         }
         return false;
      }) as Client[];
   
   
   return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
         <Title>Clients</Title>
         <Search />
         <Card className="mt-6">
            <UsersTable users={clients} products={[]} />
         </Card>
         <AddButton />
      </main>
  );
}