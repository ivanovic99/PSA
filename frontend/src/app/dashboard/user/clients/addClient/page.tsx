'use client'
import { useState } from 'react';
import Modal from 'react-modal'
import { useRouter } from 'next/navigation'
import '@/app/dashboard/admin/[id]/settings/settings.css';
import '@/app/modal.css'

export default function Settings(this: any) {
   const router = useRouter()
   const [isAddClientModalOpen, setAddClinetModalOpen] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   const handleOpenAddClientModal = () => {
      setAddClinetModalOpen(true);
    };
    
    const handleCloseAddClientModal = () => {
      setAddClinetModalOpen(false);
    };
   const [ name, setName ] = useState<string>("")   
   const [ email, setEmail ] = useState<string>("")
   const [ phone, setPhone ] = useState<string>("")
   const [ address, setAddress ] = useState<string>("")
   const [ city, setCity ] = useState<string>("")
   const [ country, setCountry ] = useState<string>("")
   const [ CUIL, setCUIL ] = useState<number>(0)

   const addClient = async (e: any) => {
      e.preventDefault()
      const client = {
         name,
         email,
         phone,
         address,
         country,
         city,
         CUIL,
      }
      setIsLoading(true)
      await fetch('./addClient/api', {
         method: 'POST',
         body: JSON.stringify(client),
      })
      setIsLoading(false)
      handleCloseAddClientModal()
      router.push('/dashboard/user/clients')
   }
   return (
      <div className="">
         <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper">
               
               <form>
                  <div className="formbold-form-title">
                     <h2 className="">Add Client</h2>
                  </div>
                  <br />
                  <div className="formbold-input-flex">
                     <div>
                        <label htmlFor="name" className="formbold-form-label">
                           Name
                        </label>
                        <input
                           type="text"
                           name="name"
                           id="name"
                           className="formbold-form-input"
                           value={name}
                           placeholder={"Please enter the name"}
                           onChange={(e) => setName(e.target.value)}
                        />
                     </div>
                     <div className=''>
                        <label htmlFor="email" className="formbold-form-label"> Email </label>
                        <input
                           type="email"
                           name="email"
                           id="email"
                           className="formbold-form-input"
                           value={email}
                           placeholder={"Please enter the email"}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </div>
                  </div>
                  <br />
                  <div className="formbold-input-flex">
                     <div>
                        <label htmlFor="phone" className="formbold-form-label"> Phone number </label>
                        <input
                           type="text"
                           name="phone"
                           id="phone"
                           className="formbold-form-input placeholder:text-[12px]"
                           value={phone}
                           placeholder={"Please enter the phone number"}
                           onChange={(e) => setPhone(e.target.value)}
                        />
                     </div>
                     <div>
                        <label htmlFor="CUIL" className="formbold-form-label"> CUIL </label>
                        <input
                           type="number"
                           name="CUIL"
                           id="CUIL"
                           className="formbold-form-input hide-number-spinners"
                           value={CUIL}
                           onChange={(e) => setCUIL(e.target.valueAsNumber)}
                        />
                     </div>
                  </div>

                  <div className="formbold-input-flex">
                     <div>
                        <label htmlFor="country" className="formbold-form-label"> country </label>
                        <input
                           type="text"
                           name="country"
                           id="country"
                           className="formbold-form-input placeholder:text-[13px]"
                           value={country}
                           placeholder={"Please enter the country"}
                           onChange={(e) => setCountry(e.target.value)}
                        />
                     </div>
                     <div>
                        <label htmlFor="city" className="formbold-form-label">
                           City
                        </label>
                        <input
                           type="text"
                           name="city"
                           id="city"
                           className="formbold-form-input"
                           value={city}
                           placeholder={"Please enter the city"}
                           onChange={(e) => setCity(e.target.value)}
                           />
                     </div>
                  </div>
                  <div className="formbold-mb-3">
                     <label htmlFor="address" className="formbold-form-label">
                        Address
                     </label>
                     <input
                        type="text"
                        name="address"
                        id="address"
                        className="formbold-form-input"
                        value={address}
                        placeholder={"Please enter the address"}
                        onChange={(e) => setAddress(e.target.value)}
                     />
                  </div>

                  <button className="formbold-btn" type='button' onClick={handleOpenAddClientModal}>Add Client</button>
                  <Modal
                     isOpen={isAddClientModalOpen}
                     onRequestClose={handleCloseAddClientModal}
                     ariaHideApp={false}
                     >
                     <h2>Are you sure you want to add this client?</h2>
                     <button onClick={addClient}>Yes</button>
                     <button onClick={handleCloseAddClientModal}>No</button>
                     <br />
                     <button onClick={handleCloseAddClientModal}>Close</button>
                  </Modal>
                  <Modal
                     isOpen={isLoading}
                     ariaHideApp={false}
                     >
                     <h2>Adding client ...</h2>
                     <br />
                  </Modal>
               </form>
            </div>
         </div>
      </div>
   )
}