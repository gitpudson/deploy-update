import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify';
import './AddGoogleSheet.css'

const AddGoogleSheet = () => {
  //ทดสอบยิง Api ผ่าน google app script
    //Google Sheet API Backend CRUD Complete      
    const url = "https://script.google.com/macros/s/AKfycbxmXinONjGjPhUEAnQ8PDjlZmSsWXOxkX5Y3qQfF717f1k4jxyouYW4u6m-RKCI-Fut/exec";

    const STATUS_IDLE = 0;
    const STATUS_UPLOADING = 1;
    const [status, setStatus] = useState(STATUS_IDLE);
    
    const [image, setImage] = useState(false);
    const [files, setFiles] = useState([]);
    const base64 = [];
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad",
    })

    const renderFileList = () => (<ol>
        {
            [...files].map((f, i) => (
                <li key={i}>{f.name} - {f.type}</li>
            ))
        }
    </ol>)

    const packFiles = (files) => {
        const data = new FormData();
        [...files].forEach((file, i) => {
            data.append('file' + i, file, file.name);

            var reader = new FileReader() //this for convert to Base64 
            reader = new FileReader() //this for convert to Base64 
            reader.readAsDataURL(file) //start conversion...
            reader.onload = function (e) {
                var rawLog = file.name + "||" + file.type + "||" + reader.result.split(',')[1]; //extract only thee file data part
                base64.push(rawLog)
            }

        })

        return data
    }

    const handleUploadClick = () => {
        if (files.length) {
            const data = packFiles(files)

        }
    }

    const getButtonStatusText = () => {
        return (status === STATUS_IDLE) ? 'Add' : <img src="./load.svg" alt="" />
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async  (event) =>{
        event.preventDefault();           
        setStatus(STATUS_UPLOADING)
        
        const post = {
        function:'createTodo',
        payload:{
            name:data.name,
            description:data.description,
            price:data.price,
            category:data.category,
            image:base64,

        }
        }

        console.log(post);
        
        const response = await axios.post(`${url}`,post,
        {
            headers: {
            'Content-Type': 'text/plain',
            },
            mode: "no-cors"
        }
        )

        console.log(response.data);

        if (response.data.success) {
            setData({
            name:"",
            description:"",
            price:"",
            category:data.category,
            })
            setImage(false)
            setFiles([])
            toast.success(response.data.message)

        }
        else{
            toast.error(response.data.message)
        }
  
        setStatus(STATUS_IDLE);            
  
      }

    
  return (
        <div className='add'>
              <script>
        
              </script>
        
              <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                  <p>Upload Image Google Sheet</p>
                  <label htmlFor="image">
                    <img src={assets.upload_area} alt="" />
                  </label>
                  <input onChange={(e)=>setFiles(e.target.files)} type="file" accept='image/*' id='image' multiple hidden required />
                  {renderFileList()}{handleUploadClick()}
                </div>
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
                <button type='submit' className='add-btn' disabled={status === STATUS_UPLOADING}>{getButtonStatusText()}</button>
                
              </form>  
        
            </div>
    )
}

export default AddGoogleSheet