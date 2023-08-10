import { Card, Title } from '@tremor/react';
import Search from '@/app/components/dashboard/search';
import ProductsTable from '@/app/components/dashboard/table';
import AddButton from '@/app/components/dashboard/addButton';
import { Product } from '@/../types/product';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
   const search = searchParams.q ?? '';
   const products = [
      {
         "id":1,
         "name":"John Doe",
         "version": "1.0.0",
      },
      {
         "id":2,
         "name":"John Doe 2",
         "version": "1.0.0",
      },
      {
         "id":3,
         "name":"dsa",
         "version": "1.0.0",
      },
   ].filter((product) => {
         if (!search) return true;
         if (product.name.toLowerCase().includes(search.toLowerCase())) {
            return true;
         }
         return false;
      });
   
   
   return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Products</Title>
      <Search />
      <Card className="mt-6">
        <ProductsTable users={[]} products={products} />
      </Card>
      <AddButton/>
    </main>
  );
}