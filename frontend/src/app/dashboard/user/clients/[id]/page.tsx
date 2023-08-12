'use client'
import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import { useParams } from 'next/navigation';
import '@/app/dashboard/admin/[id]/settings/settings.css';
import '@/app/modal.css'
import { Client } from '@/../types/client';

export default function Settings() {
   const clientId = useParams().id
   const [ client, setClient ] = useState<Client>({
      _id: 0,
      name: '',
      email: '',
      phone: '',
      CUIL: '',
      country: '',
      city: '',
      address: '',

   } as unknown as Client)
   useEffect(() => {
      (async () => {
         const _client = (await (await fetch(`./${clientId}/api`)).json()).client
         setClient(_client)
      })()
   }, [])


   const editClient = async (e: any) => {
      e.preventDefault()
      setIsLoading(true)
      var updatedClient = (await (await fetch(`./${clientId}/api`, {
         method: 'PUT',
         body: JSON.stringify(client),
      })).json()).updatedClient
      setClient(updatedClient)
      setIsLoading(false)
      handleCloseEditClientModal()
   }

   const [isEditClientModalOpen, setEditClinetModalOpen] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   const handleOpenEditClientModal = () => {
      setEditClinetModalOpen(true);
    };
    
    const handleCloseEditClientModal = () => {
      setEditClinetModalOpen(false);
    };

   return (
      <div className="">
         <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper">
               
               <form>
                  <div className="formbold-form-title">
                     <h2 className="">Client&apos;s details</h2>
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
                           value={client?.name}
                           placeholder={"Please enter the name"}
                           onChange={(e) => setClient(state =>
                              ({
                                 ...state, ...{
                                     name: e.target.value,
                                 } as Client
                             })
                           )}
                        />
                     </div>
                     <div className=''>
                        <label htmlFor="email" className="formbold-form-label"> Email </label>
                        <input
                           type="email"
                           name="email"
                           id="email"
                           className="formbold-form-input"
                           value={client?.email}
                           placeholder={"Please enter the email"}
                           onChange={(e) => setClient(state =>
                              ({
                                 ...state, ...{
                                     email: e.target.value,
                                 } as Client
                             })
                           )}
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
                           value={client?.phone}
                           placeholder={"Please enter the phone number"}
                           onChange={(e) => setClient(state =>
                              ({
                                 ...state, ...{
                                    phone: e.target.value,
                                 } as unknown as Client
                             })
                           )}
                        />
                     </div>
                     <div>
                        <label htmlFor="CUIL" className="formbold-form-label"> CUIL </label>
                        <input
                           type="number"
                           name="CUIL"
                           id="CUIL"
                           className="formbold-form-input hide-number-spinners"
                           value={client?.CUIL}
                           onChange={(e) => setClient(state =>
                              ({
                                 ...state, ...{
                                    CUIL: e.target.value,
                                 } as unknown as Client
                             })
                           )}
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
                           value={client?.country}
                           placeholder={"Please enter the country"}
                           onChange={(e) => setClient(state =>
                              ({
                                 ...state, ...{
                                    country: e.target.value,
                                 } as unknown as Client
                             })
                           )}
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
                           value={client?.city}
                           placeholder={"Please enter the city"}
                           onChange={(e) => setClient(state =>
                              ({
                                 ...state, ...{
                                    city: e.target.value,
                                 } as unknown as Client
                             })
                           )}
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
                        value={client?.address}
                        placeholder={"Please enter the address"}
                        onChange={(e) => setClient(state =>
                           ({
                              ...state, ...{
                                 address: e.target.value,
                              } as unknown as Client
                          })
                        )}
                     />
                  </div>

                  <button className="formbold-btn" type='button' onClick={handleOpenEditClientModal}>Edit Client</button>
                  <Modal
                     isOpen={isEditClientModalOpen}
                     onRequestClose={handleCloseEditClientModal}
                     ariaHideApp={false}
                     >
                     <h2>Are you sure you want to edit this client?</h2>
                     <button onClick={editClient}>Yes</button>
                     <button onClick={handleCloseEditClientModal}>No</button>
                     <br />
                     <button onClick={handleCloseEditClientModal}>Close</button>
                  </Modal>
                  <Modal
                     isOpen={isLoading}
                     ariaHideApp={false}
                     >
                     <h2>Editing client ...</h2>
                     <br />
                  </Modal>
               </form>
            </div>
         </div>
      </div>
   )
}