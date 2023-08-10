'use client'
import './dashboard.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function AddClientButton() {
   const pathname = usePathname()
   var add = 'Add Client'
   var link = '/dashboard/user/clients/addClient'
   switch (pathname) {
      case '/dashboard/user/products':
         add = 'Add Product'
         link = '/dashboard/user/products/addProduct'
         break
      case '/dashboard/user/projects':
         add = 'Add Project'
         link = '/dashboard/user/projects/addProject'
         break
      case '/dashboard/user/resources':
         add = 'Add Resource'
         link = '/dashboard/user/resources/addResource'
         break
      case '/dashboard/admin/users':
         add = 'Add User'
         link = '/dashboard/admin/users/addUser'
         break
      default:
         break
   }

   return (
      <div>
         <div className='mt-6'>
            <Link href={link} className='addClientButton ml-1'>
               {add}
            </Link>
         </div>
      </div>
   )
}
