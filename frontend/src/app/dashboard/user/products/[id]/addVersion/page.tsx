'use client'
import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import { useParams, useRouter } from 'next/navigation';
import '@/app/dashboard/admin/[id]/settings/settings.css';
import '@/app/modal.css'
import { Product } from '@/../types/product';
import { Version } from '@/../types/versions';
import '@/app/components/dashboard/select.css'
import Link from 'next/link';

export default function addVersion() {
   const router = useRouter()
   const productId = useParams().id
   const [ lastVersion, setLastVersion ] = useState<Version>({
      id: 0,
      versionNumber: '',
      customization: '',
   } as unknown as Version)
   const [ version, setVersion ] = useState<Version>({
      id: 0,
      versionNumber: '',
      customization: '',
   } as unknown as Version)
   const [ product, setProduct ] = useState<Product>({
      _id: 0,
      name: '',
      versions: [] as unknown as Version[],
      description: '',

   } as unknown as Product)
   useEffect(() => {
      (async () => {
         const _product = (await (await fetch(`/dashboard/user/products/${productId}/api`)).json()).product
         setProduct(_product)
         const lastProdVersion = _product.versions[_product.versions.length - 1]
         setLastVersion(lastProdVersion)
      })()
   }, [])


   const addVersion = async (e: any) => {
      e.preventDefault()
      setIsLoading(true)
      var addVersionToProd = (await (await fetch(`./addVersion/api`, {
         method: 'POST',
         body: JSON.stringify({version, productId}),
      })).json())
      setIsLoading(false)
      handleCloseAddVersionModal()
      router.push(`/dashboard/user/products/${productId}`)
   }

   const [isAddVersionModalOpen, setAddVersionModalOpen] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   const handleOpenAddVersionModal = () => {
      setAddVersionModalOpen(true);
    };
    
    const handleCloseAddVersionModal = () => {
      setAddVersionModalOpen(false);
    };

   return (
      <div className="">
         <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper">
               
               <form>
                  <div className="formbold-form-title">
                     <h2 className="">Add Version to Product:</h2>
                     <br />
                     <Link href={`/dashboard/user/products/${productId}`}>
                        <h2 className="custom-underlined">
                        {product.name}
                        </h2>
                     </Link>
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
                        value={version.versionNumber ? version.versionNumber : ""}
                        placeholder={`The latest version number is: ${lastVersion.versionNumber}`}
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
                        value={version.customization ? version.customization : ''}
                        placeholder={`The latest customization is: ${lastVersion.customization}`}
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
                  <button className="button-67" type='button' onClick={handleOpenAddVersionModal}>Add version</button>
                  <Modal
                     isOpen={isAddVersionModalOpen}
                     onRequestClose={handleCloseAddVersionModal}
                     ariaHideApp={false}
                     >
                     <h2>Add this version to product '{product.name}'?</h2>
                     <button onClick={addVersion}>Yes</button>
                     <button onClick={handleCloseAddVersionModal}>No</button>
                     <br />
                     <button onClick={handleCloseAddVersionModal}>Close</button>
                  </Modal>
                  <Modal
                     isOpen={isLoading}
                     ariaHideApp={false}
                     >
                     <h2>Adding version ...</h2>
                     <br />
                  </Modal>
               </form>
            </div>
         </div>
      </div>
   )
}