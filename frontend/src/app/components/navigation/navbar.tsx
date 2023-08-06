'use client';

import Image from 'next/image'
import './navbarStyle.css'
import ButtonNav from './buttonNav'
import { usePathname } from 'next/navigation';
import { useAppSelector } from "@/redux/store";

const navigation = [
   { name: 'Clients', href: '/dashboard/user/clients' },
   { name: 'Products', href: '/dashboard/user/products' },
   { name: 'Projects', href: '/dashboard/user/projects' },
   { name: 'Resources', href: '/dashboard/user/resources' },
   { name: 'Users', href: '/dashboard/admin/users' },
 ];

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
   const pathname = usePathname();
   const username = useAppSelector((state) => state.authReducer.value.username)

   return (
      <nav className='navbar-container'>
         {
            !username ? (
               <div className="home-logo-container">
                  <a
                  className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                  href="/"
                  rel="noopener noreferrer"
                  >
                  {/* Add padding to the container element */}
                  <div className="p-6">
                     <Image
                        src="/home.svg"
                        alt="Vercel Logo"
                        className="dark:invert w-full h-auto"
                        width={40}
                        height={9}
                        priority
                     />
                     <h2>Home</h2>
                  </div>
                  </a>
               </div>
            ) : (
               <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="home-logo-container">
               <a
               className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
               href="/dashboard/user/clients"
               rel="noopener noreferrer"
               >
               {/* Add padding to the container element */}
               <div className="p-6">
                  <Image
                     src="/home.svg"
                     alt="Vercel Logo"
                     className="dark:invert w-full h-auto"
                     width={40}
                     height={9}
                     priority
                  />
                  <h2>Home</h2>
               </div>
               </a>
            </div>
            <div className="flex items-center md:order-2">
               <ButtonNav />
            </div>

            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
               <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 md:flex-row md:space-x-20 md:mt-0">
                  {navigation.map((item) => (
                     <li key={item.name}>
                        <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                           pathname === item.href
                           ? 'border-slate-500 text-gray-900'
                           : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                           'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                        )}
                        aria-current={pathname === item.href ? 'page' : undefined}
                     >
                        {item.name}
                        </a>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
            )

         }
         
      </nav>
   )
}
