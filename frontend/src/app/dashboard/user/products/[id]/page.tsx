'use client'
import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import { useParams } from 'next/navigation';
import '@/app/dashboard/admin/[id]/settings/settings.css';
import '@/app/modal.css'
import { Product } from '@/../types/product';
import { Version } from '@/../types/versions';
import SelectVersion from '@/app/components/dashboard/selectVersion';
import Link from 'next/link';

export default function Settings() {
   const productId = useParams().id
   const [ product, setProduct ] = useState<Product>({
      _id: 0,
      name: '',
      versions: [] as unknown as Version[],
      description: '',

   } as unknown as Product)
   useEffect(() => {
      (async () => {
         const _product = (await (await fetch(`./${productId}/api`)).json()).product
         setProduct(_product)
      })()
   }, [])


   const editProduct = async (e: any) => {
      e.preventDefault()
      setIsLoading(true)
      var updatedProduct = (await (await fetch(`./${productId}/api`, {
         method: 'PUT',
         body: JSON.stringify(product),
      })).json()).updatedProduct
      setProduct(updatedProduct)
      setIsLoading(false)
      handleCloseEditProductModal()
   }

   const [isEditProducttModalOpen, setEditProductModalOpen] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   const handleOpenEditProductModal = () => {
      setEditProductModalOpen(true);
    };
    
    const handleCloseEditProductModal = () => {
      setEditProductModalOpen(false);
    };

   return (
      <div className="">
         <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper">
               
               <form>
                  <div className="formbold-form-title">
                     <h2 className="">{product.name}&apos;s details</h2>
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
                        value={product?.name}
                        placeholder={"Please enter the name"}
                        onChange={(e) => setProduct(state =>
                           ({
                              ...state, ...{
                                    name: e.target.value,
                              } as Product
                           })
                        )}
                     />
                  </div>
                  <div className=''>
                     <label htmlFor="description" className="formbold-form-label"> Description </label>
                     <input
                        type="description"
                        name="description"
                        id="description"
                        className="formbold-form-input"
                        value={product?.description}
                        placeholder={"Please enter the description"}
                        onChange={(e) => setProduct(state =>
                           ({
                              ...state, ...{
                                    description: e.target.value,
                              } as Product
                           })
                        )}
                     />
                  </div>
                  <div className=''>
                     <label htmlFor="price" className="formbold-form-label"> Price </label>
                     <input
                        type="price"
                        name="price"
                        id="price"
                        className="formbold-form-input"
                        value={product?.price}
                        placeholder={"Please enter the price"}
                        onChange={(e) => setProduct(state =>
                           ({
                              ...state, ...{
                                    price: e.target.value,
                              } as unknown as Product
                           })
                        )}
                     />
                  </div>
                  <br />
                  <div className="formbold-mb-3">
                     <SelectVersion versions={product.versions} productId={product._id}/>
                  </div>
                  <Link href={`./${productId}/addVersion`} className="button-67">Add version</Link>
                  <br />
                  <button className="formbold-btn" type='button' onClick={handleOpenEditProductModal}>Edit Product</button>
                  <Modal
                     isOpen={isEditProducttModalOpen}
                     onRequestClose={handleCloseEditProductModal}
                     ariaHideApp={false}
                     >
                     <h2>Are you sure you want to edit this product?</h2>
                     <button onClick={editProduct}>Yes</button>
                     <button onClick={handleCloseEditProductModal}>No</button>
                     <br />
                     <button onClick={handleCloseEditProductModal}>Close</button>
                  </Modal>
                  <Modal
                     isOpen={isLoading}
                     ariaHideApp={false}
                     >
                     <h2>Editing product ...</h2>
                     <br />
                  </Modal>
               </form>
            </div>
         </div>
      </div>
   )
}