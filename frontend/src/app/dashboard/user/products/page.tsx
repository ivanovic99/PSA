'use client'
import { Card, Title } from '@tremor/react';
import Search from '@/app/components/dashboard/search';
import ProductsTable from '@/app/components/dashboard/table';
import AddButton from '@/app/components/dashboard/addButton';
import { Product } from '@/../types/product';
import { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";

export const dynamic = 'force-dynamic'

export default function Products() {

   const [products, setProducts] = useState<Product[]>([]);
   useEffect(() => {
      
      (async () => {
         const _products = await fetch('/dashboard/user/products/api')
         setProducts((await _products.json()).products)
      })()
      
   }, []);
   const searchParams = useSearchParams()
   const search = searchParams.get('q') ?? '';
   var filteredProducts = [] as Product[]
   var filtered = false
   if (products && search) {
      filteredProducts = (products?.filter((product) => {
            if (!search) return true;
            if (product.name.toLowerCase().includes(search.toLowerCase())) {
               return true;
            }
            return false;
         }) as Product[]);
      filtered = true
   }
   
   return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Products</Title>
      <Search />
      <Card className="mt-6">
        <ProductsTable users={[]} products={filtered ? filteredProducts : products} />
      </Card>
      <AddButton/>
    </main>
  );
}