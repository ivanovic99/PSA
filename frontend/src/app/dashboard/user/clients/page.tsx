import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  // SEARCH FOR Clients
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
      <Title>Clients</Title>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}