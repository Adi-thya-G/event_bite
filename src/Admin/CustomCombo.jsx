import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import menu from '../Appwrite/menu'
import {useDispatch, useSelector} from 'react-redux'
function CustomCombo() {
  const id=useSelector((state)=>state.auth.vendorId)
    const [error,seterror]=useState("")
    

  const form=useForm();
  const {register,handleSubmit,formState,watch}=form
  const {errors}=formState

 const handlesubmit=async(data)=>{
  console.log(data.type)
  try{
 let image= await menu.uploadFile(data["image"][0])
 let res=await menu.createcombo({name:data["name"],description:data["description"],image:image.$id,rating:"0",type:data.type})
console.log(id)  
}
  catch(error)
  {
    seterror(error.message)
  }

 }
  return (
    <div className='main-content m-2 bg-white shadow-lg rounded-lg '>
        <div className=' '>
        <form action=" "  onSubmit={handleSubmit(handlesubmit)}className='form-group'>
            <div className=''>
            <select name="type" id="type" className=' pl-2.5 bg-gray-50 border h-10 border-gray-300 text-gray-900 text-[16px] rounded-sm focus:ring-gray-500 focus:border-gray-500 block w-full  '
            {...register("type")}>
              <option value="veg">veg</option>
              <option value="nonveg">non veg</option>
            </select>
            </div>
            <div className='form-group'>
                <label htmlFor="name">Item-Name</label>
                <input type="text" id='name' placeholder='Food item name' {...register("name",{
                  required:"name is required"
                })}/>
                 <p className='text-red-400 text-sm pl-20'>{errors.name?.message}</p>
            </div>
            <div className='form-group'>
            <label htmlFor="description">Description</label>
                <textarea name="description" id="description" placeholder='Enter the item description' 
                {...register("description",{
                  required:"description is required",
                })}
                minLength={50} maxLength={120}></textarea>
                <p className='text-red-400 text-sm pl-20'>{errors.description?.message}</p>
            </div>
            <div className='form-group'>
              <label htmlFor="category"> Category</label>
              <input type="text" id='category' placeholder='ex:sweet ,spice etc' {...register("category",
                {required:"category is required"}
              )} />
               <p className='text-red-400 text-sm pl-20'>{errors.category?.message}</p>
             </div>
             <div className='form-group'>
              <label htmlFor="price">Price</label>
              <input type="number" id='price' placeholder='price of item' min={20} {...register("price",{
                required:"price is required"
              })} />
               <p className='text-red-400 text-sm pl-20'>{errors.price?.message}</p>
             </div>
            <div className='form-group'>
            <label htmlFor="image">Food image</label>
            <input type="file" id="image"  accept="image/*" required=""  {...register("image",{
              required:"please upload image"
            })}/>
             <p className='text-red-400 text-sm pl-20'>{errors.image?.message}</p>
            </div>
           <div className='form-group flex '>
           <button type='submit' className='w-20 h-10 text-white bg-blue-400 border-2 border-blue-300 shadow-lg'>submit</button>
           </div>
        </form>
     
    </div>
    </div>
  )
}

export default CustomCombo