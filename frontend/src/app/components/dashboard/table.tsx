import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
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
         {users.length > 0 ? (
            <div>
               {users.map((user) => (
                  (isUser(user) ? (
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
                           </TableRow>
                        </TableBody>
                     </Table>
                  ) : (
                     <Table>
                        <TableHead>
                           <TableRow>
                              <TableHeaderCell className='fixed-width-cell'>Name</TableHeaderCell>
                              <TableHeaderCell className='fixed-width-cell'>CUIL</TableHeaderCell>
                              <TableHeaderCell className='fixed-width-cell'>Email</TableHeaderCell>
                           </TableRow>
                        </TableHead>
                        <TableRow key={user._id}>
                           <TableCell className='fixed-width-cell'>{user.name}</TableCell>
                           <TableCell className='fixed-width-cell'>
                              <Text>{user.CUIL}</Text>
                           </TableCell>
                           <TableCell className='fixed-width-cell'>
                              <Text>{user.email}</Text>
                           </TableCell>
                        </TableRow>
                     </Table>
                  ))   
               ))}
            </div>
         ) : (
            <Table>
               <TableHead>
                  <TableRow>
                     <TableHeaderCell className='fixed-width-cell'>Name</TableHeaderCell>
                     <TableHeaderCell className='fixed-width-cell'>Description</TableHeaderCell>
                     <TableHeaderCell className='fixed-width-cell'>Version</TableHeaderCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {products.map((product) => (
                     <TableRow key={product.id}>
                        <TableCell className='fixed-width-cell'>{product.name}</TableCell>
                        <TableCell className='fixed-width-cell'>
                           <Text>{product.description}</Text>
                        </TableCell>
                        <TableCell className='fixed-width-cell'>
                           <Text>{product.versions.at(-1)?.versionNumber}</Text>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         )
      }
    </div>
  );
}