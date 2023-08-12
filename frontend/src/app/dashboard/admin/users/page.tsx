import { Card, Title } from '@tremor/react';
import Search from '@/app/components/dashboard/search';
import UsersTable from '@/app/components/dashboard/table';
import AddButton from '@/app/components/dashboard/addButton';
import { User } from '@/../types/user';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
   const search = searchParams.q ?? '';
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
         "name":"John Doe 3",
         "username": "dsa",
         "email":"dsa",
      },
   ].filter((user) => {
         if (!search) return true;
         if (user.name.toLowerCase().includes(search.toLowerCase())) {
            return true;
         }
         return false;
      }) as User[];
   
   
   return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
         <Title>Users</Title>
         <Search />
         <Card className="mt-6">
            <UsersTable users={users} products={[]}/>
         </Card>
         <AddButton/>
      </main>
  );
}