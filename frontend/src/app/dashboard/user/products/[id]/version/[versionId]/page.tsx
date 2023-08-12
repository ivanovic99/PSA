'use client'
import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import { useParams } from 'next/navigation';
import '@/app/dashboard/admin/[id]/settings/settings.css';
import '@/app/modal.css'
import { Version } from '@/../types/versions';

export default function Version() {
   const versionId = useParams().versionId
   const [ version, setVersion ] = useState<Version>({
      _id: 0,
      versionNumber: '1.0.0',
      customization: "",

   } as unknown as Version)
   useEffect(() => {
      (async () => {
         const _version = (await (await fetch(`./${versionId}/api`)).json()).version
         setVersion(_version)
      })()
   }, [])


   const editVersion = async (e: any) => {
      e.preventDefault()
      setIsLoading(true)
      var updatedVersion = (await (await fetch(`./${versionId}/api`, {
         method: 'PUT',
         body: JSON.stringify(version),
      })).json()).updatedVersion
      setVersion(updatedVersion)
      setIsLoading(false)
      handleCloseEditVersionModal()
   }

   const [isEditVersionModalOpen, setEditVersionModalOpen] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   const handleOpenEditVersionModal = () => {
      setEditVersionModalOpen(true);
    };
    
    const handleCloseEditVersionModal = () => {
      setEditVersionModalOpen(false);
    };

   return (
      <div className="">
         <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper">
               
               <form>
                  <div className="formbold-form-title">
                     <h2 className="">Version {version?.versionNumber}&apos;s details</h2>
                  </div>
                  <br />
                  <div>
                     <label htmlFor="versionNumber" className="formbold-form-label">
                     Version Number
                     </label>
                     <input
                        type="text"
                        name="versionNumber"
                        id="versionNumber"
                        className="formbold-form-input"
                        value={version?.versionNumber}
                        placeholder={"Please enter the version number"}
                        onChange={(e) => setVersion(state =>
                           ({
                              ...state, ...{
                                 versionNumber: e.target.value,
                              } as Version
                           })
                        )}
                     />
                  </div>
                  <div className=''>
                     <label htmlFor="customization" className="formbold-form-label"> Customization </label>
                     <input
                        type="customization"
                        name="customization"
                        id="customization"
                        className="formbold-form-input"
                        value={version?.customization}
                        placeholder={"Please enter the customization"}
                        onChange={(e) => setVersion(state =>
                           ({
                              ...state, ...{
                                    customization: e.target.value,
                              } as Version
                           })
                        )}
                     />
                  </div>
                  <br />
                  <button className="formbold-btn" type='button' onClick={handleOpenEditVersionModal}>Edit Version</button>
                  <Modal
                     isOpen={isEditVersionModalOpen}
                     onRequestClose={handleCloseEditVersionModal}
                     ariaHideApp={false}
                     >
                     <h2>Are you sure you want to edit this Version?</h2>
                     <button onClick={editVersion}>Yes</button>
                     <button onClick={handleCloseEditVersionModal}>No</button>
                     <br />
                     <button onClick={handleCloseEditVersionModal}>Close</button>
                  </Modal>
                  <Modal
                     isOpen={isLoading}
                     ariaHideApp={false}
                     >
                     <h2>Editing version ...</h2>
                     <br />
                  </Modal>
               </form>
            </div>
         </div>
      </div>
   )
}