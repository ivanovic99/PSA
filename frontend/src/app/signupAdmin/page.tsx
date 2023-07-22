'use client'
import Image from 'next/image'
import '../signinUser/Signin.css'
import { useState } from 'react'

export default function Home() {
   const [input, setInput] = useState({
      username: '',
      password: '',
      confirmPassword: ''
    });
   
    const [error, setError] = useState({
      username: '',
      password: '',
      confirmPassword: ''
    })
    const onInputChange = e => {
      const { name, value } = e.target;
      console.log(name, value)
      setInput(prev => ({
        ...prev,
        [name]: value
      }));
      validateInput(e);
    }
   
    const validateInput = e => {
      let { name, value } = e.target;
      setError(prev => {
        const stateObj = { ...prev, [name]: "" };
   
        switch (name) {
          case "username":
            if (!value) {
              stateObj[name] = "Please enter Username.";
            }
            break;
   
          case "password":
            if (!value) {
              stateObj[name] = "Please enter Password.";
            } else if (input.confirmPassword && value !== input.confirmPassword) {
              stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
            } else {
              stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
            }
            break;
   
          case "confirmPassword":
            if (!value) {
              stateObj[name] = "Please Confirm Password.";
            } else if (input.password && value !== input.password) {
              stateObj[name] = "Passwords do not match.";
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
                  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                  src="forestLogo.svg"
                  alt="Next.js Logo"
                  width={80}
                  height={17}
                  priority
               />
            </div>
            <h2 className={`mb-3 text-3xl font-semibold`}>Sign Up as Admin</h2>
            <form>
               <div className="user-box">
                  <input type="text" name="email" required></input>
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
                  <input type="password" name="adminKey"
                  ></input>
                  <label>Admin Key</label>
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
