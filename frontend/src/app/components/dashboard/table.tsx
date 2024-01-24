import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import Link from 'next/link';
import { User } from '@/../types/user';
import { Client } from '@/../types/client';
import { Product } from '@/../types/product';
import './dashboard.css'


function isUser(object: any): object is User {
   return 'id' in object;
}

export default function UsersTable({ users, products }: { users: User[] | Client[], products: Product[] }) {
  return (
      <div>
         {users?.length > 0 ? (
            <div>
               {users?.map((user) => (
               (isUser(user) ? (
                  <div key={user.id}>
                     <Table>
                        <TableHead>
                           <TableRow>
                              <TableHeaderCell className='fixed-width-cell'>Name</TableHeaderCell>
                              <TableHeaderCell className='fixed-width-cell'>Username</TableHeaderCell>
                              <TableHeaderCell className='fixed-width-cell'>Email</TableHeaderCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           <TableRow key={user.id}>
                              <TableCell className='fixed-width-cell'>{user.name}</TableCell>
                              <TableCell className='fixed-width-cell'>
                              <Text>{user.username}</Text>
                              </TableCell>
                              <TableCell className='fixed-width-cell'>
                              <Text>{user.email}</Text>
                              </TableCell>
                              <TableCell className='w-0 hover:underline text-blue-500'>
                              <Link href={`/dashboard/admin/users/${user.id}`}>
                                 See details
                              </Link>
                              </TableCell>
                           </TableRow>
                        </TableBody>
                     </Table>
                  </div>
               ) : (
                  <div key={user._id}>
                     <Table>
                        <TableHead>
                           <TableRow>
                              <TableHeaderCell className='fixed-width-cell'>Name</TableHeaderCell>
                              <TableHeaderCell className='fixed-width-cell'>CUIL</TableHeaderCell>
                              <TableHeaderCell className='fixed-width-cell'>Email</TableHeaderCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           <TableRow key={user._id}>
                              <TableCell className='fixed-width-cell'>{user.name}</TableCell>
                              <TableCell className='fixed-width-cell'>
                              <Text>{user.CUIL}</Text>
                              </TableCell>
                              <TableCell className='fixed-width-cell'>
                              <Text>{user.email}</Text>
                              </TableCell>
                              <TableCell className='w-0 hover:underline text-blue-500'>
                              <Link href={`/dashboard/user/clients/${user._id}`}>
                                 See details
                              </Link>
                              </TableCell>
                           </TableRow>
                        </TableBody>
                     </Table>
                  </div>
               ))
               ))}
            </div>
         ) : (
            <div>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableHeaderCell className='fixed-width-cell'>Name</TableHeaderCell>
                        <TableHeaderCell className='fixed-width-cell'>Description</TableHeaderCell>
                        <TableHeaderCell className='fixed-width-cell'>Latest Version</TableHeaderCell>
                        <TableHeaderCell className='fixed-width-cell'>Price</TableHeaderCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {products?.map((product) => (
                        <TableRow key={product._id}>
                           <TableCell className='fixed-width-cell'>{product.name}</TableCell>
                           <TableCell className='fixed-width-cell'>
                              <Text>{product.description}</Text>
                           </TableCell>
                           <TableCell className='fixed-width-cell'>
                              <Text>{product.versions.at(-1)?.versionNumber}</Text>
                           </TableCell>
                           <TableCell className='fixed-width-cell'>
                              <Text>{product.price}</Text>
                           </TableCell>
                           <TableCell className='w-0 hover:underline text-blue-500'>
                                 <Link href={`/dashboard/user/products/${product._id}`}>
                                    See details
                                 </Link>
                              </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </div>
         )
      }
    </div>
  );
}