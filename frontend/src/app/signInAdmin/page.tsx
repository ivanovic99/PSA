'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import '../signInUser/Signin.css'
import { logIn } from '../../redux/features/auth-slice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import Link from 'next/link'

export default function SignInAdmin() {
   const router = useRouter()
   const dispatch = useDispatch<AppDispatch>()
   const makeAPICall = async (e: any) => {
      try {
         e.preventDefault();
         const res = await fetch('signInAdmin/api', {
            method: 'POST',
            body: JSON.stringify({
               username: e.target.username.value,
               password: e.target.password.value,
               adminKey: e.target.adminKey.value
            })})
         const { user, message } = await res.json()
         if (message) {
            alert("Incorrect username or password")
            return
         }
         user.isAdmin = true
         user.id = user._id
         dispatch(logIn(user))
         router.push("/dashboard/admin")
      } catch(err) {
         console.log(err)
      }
      };

   return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
         <div className="login-box flex flex-col items-center">
            <Link href="/" className='mb-1 text-1xl font-semibold mr-auto p-15 hover:opacity-60 hover:underline'> {'<-'} Go Back
               </Link>
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
            <h2 className={`mb-3 text-3xl font-semibold`}>Sign In as Admin</h2>
            <form onSubmit={makeAPICall}>
               <div className="user-box">
                  <input type="text" name="username" required></input>
                  <label>Username or Email</label>
               </div>
               <div className="user-box">
                  <input type="password" name="password" required></input>
                  <label>Password</label>
               </div>
               <div className="user-box">
                  <input type="password" name="adminKey" required></input>
                  <label>Admin Key</label>
               </div>
               <button>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Submit
               </button>
            </form>
         </div>
         
      </main>
  )
}
