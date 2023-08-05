'use client'
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import axios from "axios";

interface Admin {
   admin: any
   error: any
}

export default  function Dashboard({ Component, pageProps }: AppProps) {
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
         Hello dashboard
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
