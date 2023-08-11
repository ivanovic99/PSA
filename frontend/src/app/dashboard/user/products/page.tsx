'use client'
import { Card, Title } from '@tremor/react';
import Search from '@/app/components/dashboard/search';
import ProductsTable from '@/app/components/dashboard/table';
import AddButton from '@/app/components/dashboard/addButton';
import { Product } from '@/../types/product';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';

export default function IndexPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {

   const [products, setProducts] = useState<Product[]>([]);
   useEffect(() => {
      
      (async () => {
         const _products = await fetch('/dashboard/user/products/api')
         setProducts((await _products.json()).products)
      })()
      
   }, []);
   const search = searchParams.q ?? '';
   products?.filter((client) => {
         if (!search) return true;
         if (client.name.toLowerCase().includes(search.toLowerCase())) {
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