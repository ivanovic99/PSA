'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '../signInUser/Signin.css'

export default function Home() {

   const router = useRouter()
   const makeAPICall = async (e: any) => {
      e.preventDefault();
      const res = await fetch('http://localhost:3000/signUpAdmin/api', {
         method: 'POST',
         body: JSON.stringify({
            email: e.target.email.value,
            username: e.target.username.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value,
            adminKey: e.target.adminKey.value
         })})
      router.push("/signInAdmin")
      };

   const [input, setInput] = useState({
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      adminKey: ''
    });
   
    const [error, setError] = useState({
      username: '',
      password: '',
      confirmPassword: ''
    })
    const onInputChange = (e: { target: any; }) => {
      const { name, value } = e.target;
      setInput(prev => ({
        ...prev,
        [name]: value
      }));
      validateInput(e);
    }
   
    const validateInput = (e: { target: { name: any; value: any; }; }) => {
      let { name, value } = e.target;
      setError(prev => {
        const stateObj = { ...prev, [name]: "" };
   
        switch (name) {
          case "username":
            if (!value) {
              stateObj[name as keyof typeof stateObj] = "Please enter Username.";
            }
            break;

          case "email":
            if (!value) {
              stateObj[name as keyof typeof stateObj] = "Please enter Email.";
            }
            break;

          case "adminKey":
            if (!value) {
              stateObj[name as keyof typeof stateObj] = "Please enter an Admin Key.";
            }
            break;
   
          case "password":
            if (!value) {
               stateObj[name as keyof typeof stateObj] = "Please enter Password.";
            } else if (input.confirmPassword && value !== input.confirmPassword) {
              stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
            } else {
              stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
            }
            break;
   
          case "confirmPassword":
            if (!value) {
               stateObj[name as keyof typeof stateObj] = "Please Confirm Password.";
            } else if (input.password && value !== input.password) {
               stateObj[name as keyof typeof stateObj] = "Passwords do not match.";
            }
            break;
   
          default:
            break;
        }
   
        return stateObj;
      });
    }
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
            <h2 className={`mb-3 text-3xl font-semibold`}>Sign Up as Admin</h2>


            <form onSubmit={makeAPICall}>
               <div className="user-box">
                  <input type="text" name="email" required
                  ></input>
                  <label>Email</label>
               </div>
               <div className="user-box">
                  <input type="text" name="username" required></input>
                  <label>Username</label>
               </div>
               <div className="user-box">
                  <input type="password" name="password" required
                  value={input.password}
                  onChange={onInputChange}
                  onBlur={validateInput}></input>
                  <label>Password</label>
                  {error.password && <span className='err'>{error.password}</span>}
               </div>
               <div className="user-box">
                  <input type="password" name="confirmPassword" required
                  value={input.confirmPassword}
                  onChange={onInputChange}
                  onBlur={validateInput}></input>
                  <label>Confirm Password</label>
                  {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
               </div>
               <div className="user-box">
                  <input type="password" name="adminKey" required></input>
                  <label>Admin key</label>
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
