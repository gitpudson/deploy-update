import React, { useState } from 'react'
import './UpdatePopup.css'
import axios from "axios"
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const UpdatePopup = ({setShowUpdate,updateData,updateFunction,status}) => {
   //ทดสอบยิง Api ผ่าน google app script
      //Google Sheet Backend
      const url = "https://script.google.com/macros/s/AKfycbxVAVfNeU-YmYc4GZybAo7WL58syqVsCn8C9oca4D4AnZCNAnUn3JJlB7hpHcTTO-jo/exec";
      
    const [image,setImage] = useState(false);

    const STATUS_IDLE = 0;

    const [data,setData] = useState({
        id:updateData.id,
        name:updateData.name,
        description:updateData.description,
        price:updateData.price,
        category:updateData.category,
    })

    const getButtonStatusText = () =>{      
      return (status === STATUS_IDLE) ?'Update' : <img src="./load.svg" alt="" />
    }

    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler = async (event) =>{
    event.preventDefault();
    await updateFunction(data);


}


  return (
    <div>
            <div className='login-popup'>
                <form className="login-popup-container" onSubmit={onSubmitHandler}>
                  <div className="login-popup-title">
                                  {/* <h2>Update Data</h2> */}
                                  <img onClick={()=>setShowUpdate(false)} src={assets.cross_icon} alt="" />
                              </div>
                    {/* <div className="add-img-upload flex-col">
                              <p>Upload Image</p>
                              <label htmlFor="image">
                                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                              </label>
                              <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
                            </div> */}
                            <div className="add-product-name flex-col">
                              <p>Product name</p>
                              <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
                            </div>
                            <div className="add-product-description flex-col">
                              <p>Product description</p>
                              <textarea onChange={onChangeHandler} value={data.description} name="description" rows="10" placeholder='Write content here' required></textarea>
                            </div>
                            <div className="add-category-price">
                              <div className="add-category flex-col">
                                <p>Product category</p>
                                <select onChange={onChangeHandler} value={data.category} name="category">
                                  <option value="Salad">Salad</option>
                                  <option value="Rolls">Rolls</option>
                                  <option value="Deserts">Deserts</option>
                                  <option value="Sandwich">Sandwich</option>
                                  <option value="Cake">Cake</option>
                                  <option value="Pure Veg">Pure Veg</option>
                                  <option value="Pasta">Pasta</option>
                                  <option value="Noodles">Noodles</option>
                                </select>
                              </div>
                              <div className="add-price flex-col">
                                <p>Product price</p>
                                <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
                              </div>
                            </div>
                            {/* <button type='submit' onClick={updateFunction} >Update</button> */}
                            <button type='submit' disabled={status === 1}>{getButtonStatusText()}</button>
        
                </form>
            </div>

    </div>
  )
}

export default UpdatePopup