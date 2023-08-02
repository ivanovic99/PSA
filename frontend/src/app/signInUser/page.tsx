'use client'
import Image from 'next/image'
import './Signin.css'

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
         <div className="login-box flex flex-col items-center">
            <div className="logo mb-3">
               <Image
                  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert w-full h-auto"
                  src="forestLogo.svg"
                  alt="Next.js Logo"
                  width={80}
                  height={17}
                  priority
               />
            </div>
            <h2 className={`mb-3 text-3xl font-semibold`}>Sign In as User</h2>
            <form>
               <div className="user-box">
                  <input type="text" name="" required></input>
                  <label>Username or Email</label>
               </div>
               <div className="user-box">
                  <input type="password" name="" required></input>
                  <label>Password</label>
               </div>
               <a href="#">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Submit
               </a>
            </form>
         </div>
         
      </main>
  )
}
