"use client"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import axios from "axios";

interface Admin {
   admin: any
   error: any
}

export default function Layout({ children, }: {
   children: React.ReactNode
 }) {
   const [admin, setAdmin] = useState<Admin>({ admin: null, error: null })
   const router = useRouter()
   useEffect(() => {
      (async () => {
         const { admin, error } = await getAdmin()
         if (error) {
            router.push('/')
         }
         setAdmin({ admin, error })
      })()
    }, [router])
   if (!admin.admin) return (<div>Loading...</div>)
   return (
      <div className="flex flex-col min-h-screen">
         <main className="flex-1 w-full max-w-screen-xl mx-auto">
            {children}
         </main>
      </div>
   );
}

async function getAdmin(): Promise<Admin> {
   try {
      const res = await axios.get('/dashboard/admin/api')
      return { 
         admin: res,
         error: null
      }
   } catch (err) {
      return { 
         admin: null,
         error: err
      }
   }
}

