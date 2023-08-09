'use client'
import './settings.css';
import Link from 'next/link';
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from 'react-redux';
import { update } from '@/redux/features/auth-slice';
import { useState } from 'react';
import Modal from 'react-modal'
import '../../../../modal.css'


export default function Settings(this: any) {
   const [isConfirmEditionModalOpen, setIsConfirmEditionModalOpen] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   const handleOpenConfirmEditionModal = () => {
      setIsConfirmEditionModalOpen(true);
    };
    
    const handleCloseConfirmEditionModal = () => {
      setIsConfirmEditionModalOpen(false);
    };    
   const dispatch = useDispatch<AppDispatch>()
   const user = useAppSelector((state) => state.persistedReducer.value)
   const [ name, setName ] = useState<string>(user.name ? user.name : "")   
   const [ lastname, setLastname ] = useState<string>(user.lastname ? user.lastname : "")
   const [ email, setEmail ] = useState<string>(user.email ? user.email : "")
   const [ phone, setPhone ] = useState<string>(user.phone ? user.phone : "")
   const [ address, setAddress ] = useState<string>(user.address ? user.address : "")
   const [ username, setUsername ] = useState<string>(user.username ? user.username : "")
   const [ nationality, setNationality ] = useState<string>(user.nationality ? user.nationality : "")
   const [ age, setAge ] = useState<number>(user.age ? user.age : 18)

   const updateUser = async (e: any) => {
      e.preventDefault()
      const updateData = {
         name,
         lastname,
         email,
         phone,
         address,
         username,
         nationality,
         age,
         loggedIn: true,
         isAdmin: user.isAdmin,
         id: user.id,
         image: null,
      }
      dispatch(update(updateData))
      setIsLoading(true)
      await fetch('./settings/api', {
         method: 'PUT',
         body: JSON.stringify(updateData),
      })
      setIsLoading(false)
      handleCloseConfirmEditionModal()
   }
   return (
      <div className="">
         <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper">
               
               <form>
                  <div className="formbold-form-title">
                     <h2 className="">{user.username}'s settings</h2>
                  </div>

                  <div className="formbold-input-flex">
                     <div>
                        <label htmlFor="name" className="formbold-form-label">
                           First name
                        </label>
                        <input
                           type="text"
                           name="name"
                           id="name"
                           className="formbold-form-input"
                           value={name}
                           placeholder={name ? "" : "Please enter your name"}
                           onChange={(e) => setName(e.target.value)}
                        />
                     </div>
                     <div>
                        <label htmlFor="lastname" className="formbold-form-label"> Last name </label>
                        <input
                           type="text"
                           name="lastname"
                           id="lastname"
                           className="formbold-form-input placeholder:text-[14px]"
                           value={lastname}
                           placeholder={lastname ? "" : "Please enter your lastname"}
                           onChange={(e) => setLastname(e.target.value)}
                        />
                     </div>
                  </div>

                  <div className="formbold-mb-3">
                     <label htmlFor="username" className="formbold-form-label">
                        Username
                     </label>
                     <input
                        type="text"
                        name="username"
                        id="username"
                        className="formbold-form-input"
                        value={username}
                        placeholder={username ? "" : "Please enter your username"}
                        onChange={(e) => setUsername(e.target.value)}
                     />
                  </div>

                  <div className="formbold-input-flex">
                     <div>
                        <label htmlFor="email" className="formbold-form-label"> Email </label>
                        <input
                           type="email"
                           name="email"
                           id="email"
                           className="formbold-form-input"
                           value={email}
                           placeholder={email ? "" : "Please enter your email"}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </div>
                     <div>
                        <label htmlFor="phone" className="formbold-form-label"> Phone number </label>
                        <input
                           type="text"
                           name="phone"
                           id="phone"
                           className="formbold-form-input"
                           value={phone}
                           placeholder={phone.length > 0 ? "" : "Please enter your phone number"}
                           onChange={(e) => setPhone(e.target.value)}
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
                        placeholder={address ? "" : "Please enter your address"}
                        onChange={(e) => setAddress(e.target.value)}
                     />
                  </div>

                  <div className="formbold-input-flex">
                     <div>
                        <label htmlFor="nationality" className="formbold-form-label"> Nationality </label>
                        <input
                           type="text"
                           name="nationality"
                           id="nationality"
                           className="formbold-form-input placeholder:text-[13px]"
                           value={nationality}
                           placeholder={nationality ? "" : "Please enter your nationality"}
                           onChange={(e) => setNationality(e.target.value)}
                        />
                     </div>
                     <div>
                        <label htmlFor="age" className="formbold-form-label"> Age </label>
                        <input
                           type="number"
                           name="age"
                           id="age"
                           className="formbold-form-input"
                           value={age}
                           onChange={(e) => setAge(e.target.valueAsNumber)}
                        />
                     </div>
                  </div>

                  <div className="formbold-checkbox-wrapper">
                     <label htmlFor="supportCheckbox" className="formbold-checkbox-label">
                        Change password? {'->'}
                        <Link href="#"> Send me an email!</Link>
                     </label>
                  </div>

                  <button className="formbold-btn" type='button' onClick={handleOpenConfirmEditionModal}>Update</button>
                  <Modal
                     isOpen={isConfirmEditionModalOpen}
                     onRequestClose={handleCloseConfirmEditionModal}
                     ariaHideApp={false}
                     >
                     <h2>Are you sure you want to edit your data?</h2>
                     <button onClick={updateUser}>Yes</button>
                     <button onClick={handleCloseConfirmEditionModal}>No</button>
                     <br />
                     <button onClick={handleCloseConfirmEditionModal}>Close</button>
                  </Modal>
                  <Modal
                     isOpen={isLoading}
                     ariaHideApp={false}
                     >
                     <h2>Updating ...</h2>
                     <br />
                  </Modal>
               </form>
            </div>
         </div>
      </div>
   )
}