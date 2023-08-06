import Image from 'next/image'
import './navbarStyle.css'
import ButtonNav from './buttonNav'

export default function Navbar() {
   return (
      <nav className='navbar-container'>
         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
         <div className="flex items-center md:order-2">
            <ButtonNav />
         </div>

         <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 md:flex-row md:space-x-20 md:mt-0">
               <li key={"Clients"}>
               <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Clients</a>
               </li>
               <li key={"Products"}>
               <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Products</a>
               </li>
               <li key={"Projects"}>
               <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Projects</a>
               </li>
               <li key={"Resources"}>
               <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Resources</a>
               </li>
               {/* display only if you are an admin */}
               <li key={"Users"}>
               <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Users</a>
               </li>
            </ul>
         </div>
         </div>
      </nav>
   )
}
