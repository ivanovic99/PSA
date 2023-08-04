'use client'
import Image from 'next/image'
import Modal from 'react-modal'
import { useState } from 'react'
import './modal.css'

export default function Home() {
   const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
   const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)

   const handleOpenSignUpModal = () => {
      setIsSignUpModalOpen(true);
    };
    
    const handleCloseSignUpModal = () => {
      setIsSignUpModalOpen(false);
    };    

   const handleOpenSignInModal = () => {
      setIsSignInModalOpen(true);
   };
  
   const handleCloseSignInModal = () => {
      setIsSignInModalOpen(false);
   };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex flex-col items-center justify-center">
         <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
            <Image
            // src={img1}
            // width="0"
            // height="0"
            // sizes="100vw"
            // className="w-full h-auto"
               className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert w-full h-auto"
               src="forestLogo.svg"
               alt="Next.js Logo"
               width={140}
               height={27}
               priority
            />
         </div>
         <h1 className="my-6 text-6xl font-semibold">PSA</h1>
      </div>

      
      <div className="mb-32 h-[200px] grid gap-20 justify-center text-center lg:mb-10 lg:grid-cols-2 lg:text-left">
         <a
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
            onClick={handleOpenSignUpModal}

         >
            <h2 className={`mb-3 text-3xl font-semibold`}>
               Sign Up{' '}
               <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
               -&gt;
               </span>
            </h2>
            <br />
            <p className={`m-0 max-w-[40ch] text-sm opacity-50`}>
               If you are a new user, please sign up here.
            </p>
            <br />
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            If you want to be an Admin, please contact the your local PSA Admin so he/she gives you the Admin Key.
            </p>
         </a>

         <a
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
            onClick={handleOpenSignInModal}
         >
            <h2 className={`mb-3 text-3xl font-semibold`}>
               Sign In{' '}
               <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
               -&gt;
               </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
               If you already have an account, please sign in here.
            </p>
         </a>
         <Modal
            isOpen={isSignUpModalOpen}
            onRequestClose={handleCloseSignUpModal}
            contentLabel="Which type of account do you want to create?"
            ariaHideApp={false}
            >
            <h2>Which type of account do you want to create?</h2>
            <a href='/signUpUser' onClick={handleCloseSignUpModal}>User</a>
            <a href='/signUpAdmin' onClick={handleCloseSignUpModal}>Admin</a>
            <br />
            <button onClick={handleCloseSignUpModal}>Close</button>
         </Modal>

         <Modal
            isOpen={isSignInModalOpen}
            onRequestClose={handleCloseSignInModal}
            contentLabel="Which type of account do you have?"
            ariaHideApp={false} // Prevents app from being hidden when the modal is open
            >
            <h2>Which type of account do you have?</h2>
            <a href='/signInUser' onClick={handleCloseSignInModal}>User</a>
            <a href='/signInAdmin' onClick={handleCloseSignInModal}>Admin</a>
            <br />
            <button onClick={handleCloseSignInModal}>Close</button>
         </Modal>
      </div>
      
    </main>
  )
}
