'use client'
import { useState } from 'react';
import Modal from 'react-modal'
import { useRouter } from 'next/navigation'
import '@/app/dashboard/admin/[id]/settings/settings.css';
import '@/app/modal.css'

export default function Settings(this: any) {
   const router = useRouter()
   const [isAddProductModalOpen, setAddProductModalOpen] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   const handleOpenAddProductModal = () => {
      setAddProductModalOpen(true);
    };
    
    const handleCloseAddProductModal = () => {
      setAddProductModalOpen(false);
    };
   const [ name, setName ] = useState<string>("")   
   const [ description, setDescription ] = useState<string>("")
   const [ customization, setCustomization ] = useState<string>("")
   
   const addProduct = async (e: any) => {
      e.preventDefault()
      const product = {
         name,
         description,
         customization,
      }
      setIsLoading(true)
      await fetch('./addProduct/api', {
         method: 'POST',
         body: JSON.stringify(product),
      })
      setIsLoading(false)
      handleCloseAddProductModal()
      router.push('/dashboard/user/products')
   }
   return (
      <div className="">
         <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper">
               
               <form>
                  <div className="formbold-form-title">
                     <h2 className="">Add Product</h2>
                  </div>
                  <br />
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
                  <br />
                  <div>
                     <label htmlFor="description" className="formbold-form-label"> Description </label>
                     <input
                        type="text"
                        name="description"
                        id="description"
                        className="formbold-form-input placeholder:text-[12px]"
                        value={description}
                        placeholder={"Please enter the description"}
                        onChange={(e) => setDescription(e.target.value)}
                     />
                  </div>
                  <div>
                     <label htmlFor="customization" className="formbold-form-label"> customization </label>
                     <input
                        type="text"
                        name="customization"
                        id="customization"
                        className="formbold-form-input placeholder:text-[13px]"
                        value={customization}
                        placeholder={"Please enter the customization"}
                        onChange={(e) => setCustomization(e.target.value)}
                     />
                  </div>
                  <button className="formbold-btn" type='button' onClick={handleOpenAddProductModal}>Add Product</button>
                  <Modal
                     isOpen={isAddProductModalOpen}
                     onRequestClose={handleCloseAddProductModal}
                     ariaHideApp={false}
                     >
                     <h2>Are you sure you want to add this product?</h2>
                     <button onClick={addProduct}>Yes</button>
                     <button onClick={handleCloseAddProductModal}>No</button>
                     <br />
                     <button onClick={handleCloseAddProductModal}>Close</button>
                  </Modal>
                  <Modal
                     isOpen={isLoading}
                     ariaHideApp={false}
                     >
                     <h2>Adding product ...</h2>
                     <br />
                  </Modal>
               </form>
            </div>
         </div>
      </div>
   )
}