import { Card, Title } from '@tremor/react';
import Search from '@/app/components/dashboard/search';
import UsersTable from '@/app/components/dashboard/table';
import AddButton from '@/app/components/dashboard/addButton';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
   const search = searchParams.q ?? '';
   // SEARCH FOR Clients in the server
   const users = [
      {
         "id":1,
         "name":"John Doe",
         "username": "johndoe",
         "email":"",
      },
      {
         "id":2,
         "name":"John Doe 2",
         "username": "johndoe2",
         "email":"",
      },
      {
         "id":3,
         "name":"dsa",
         "username": "dsa",
         "email":"dsa",
      },
   ].filter((user) => {
         if (!search) return true;
         if (user.name.toLowerCase().includes(search.toLowerCase())) {
            return true;
         }
         return false;
      });
   
   
   return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Projects</Title>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users} products={[]}/>
      </Card>
      <AddButton/>
    </main>
  );
}