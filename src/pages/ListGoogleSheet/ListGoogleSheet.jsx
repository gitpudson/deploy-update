import React,{useEffect, useRef, useState} from 'react'
import axios from "axios"
import DataTable from 'react-data-table-component'
import { assets } from '../../assets/assets';
import ConfirmBox from '../../components/ConfirmBox/ConfirmBox';
import UpdatePopup from '../../components/UpdatePopup/UpdatePopup';
import { toast } from 'react-toastify';

const ListGoogleSheet = () => {
     //Google Sheet API Backend CRUD Complete
   const url = "https://script.google.com/macros/s/AKfycbxmXinONjGjPhUEAnQ8PDjlZmSsWXOxkX5Y3qQfF717f1k4jxyouYW4u6m-RKCI-Fut/exec";

  const [open,setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [updateData, setUpdateData] = useState({});

   const [records,setRecords] = useState([]);
   const [filterRecords,setFilterRecords] = useState([]);

   const STATUS_IDLE = 0;
   const STATUS_UPLOADING = 1;
   const [status,setStatus] = useState(STATUS_IDLE);

   const [showUpdate,setShowUpdate] = useState(false);

   const customStyles ={
    headRow:{
      style:{
        backgroundColor:'blue',
        color:'white'
      }
    },
    headCells:{
      style:{
        fontSize:'16px',
        fontWeight:'600',
        textTransform:'uppercase',
      }
    },
    cells:{
      style:{
        fontSize:'15px'
      }
    }
  };

   const column =[
    // {
    //   name: '#',
    //   cell: (row, index) => index+1,
    //   grow: 0,
    // },
    {
      name: "ID",
      selector : row => row.id,
      sortable: true,
      omit: false, // Hide Column
      width: "350px" 
      // maxWidth: '700px',
    },    
    {
      name: "Name",
      selector : row => row.name,
      sortable: true
    },
    {
      name: "description",
      selector : row => row.description
    },
    {
      name: "price",
      selector : row => row.price
    },
    {
      name: "category",
      selector : row => row.category
    },
    {
      name: "image_url",
      selector : row => row.image_url,
      grow: 0,
		  cell: row => <img  src={row.image_url+"&sz=w70"} />
    },
    {
      name: 'Image Link',
      button: 'true',
      cell: row => (
        <a href={row.image_url} target="_blank" rel="noopener noreferrer">
          More...
        </a>
      ),
    },
    {
      name: 'Update',
      button: 'true',
      // cell: () => <button type="button" onClick={()=>UpdateOnClick()}>Update</button>,
      cell: row => (<button className='btn-update' type="button" onClick={()=>updateOnClick(row)}>Update</button>),
    },
    {
      name: 'Delete',
      button: 'true',
      // cell: () => <ButtonDelete></ButtonDelete>,
      cell: row => (<button className='btn-delete' type="button" onClick={()=>deleteOnClick(row)}>Delete</button>),
    },

   ]   

  const updateOnClick = (data) =>{    
    setShowUpdate(true);
    setUpdateData(data);
    console.log(data);   
    
  }

  const deleteOnClick = (data) =>{
    setOpen(true);
    setDeleteData(data);
    console.log(data);   
    
  }
  
  const fetData = async () =>{
    const post = {
      function:'getTodo',
      payload:{

      }
    }

    const response = await axios.post(`${url}`,post,
      {
        headers: {
          'Content-Type': 'text/plain',
        },
        mode: "no-cors"
      }
    )

    console.log(response);
    if (response.data.success) {
      setRecords(response.data.data);
      setFilterRecords(response.data.data);
      console.log(records);
      
    }


  }

  const fetData1 = async () =>{
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => console.log(res.data))
    .then(err  => console.log(err));
    
  }


  const deleteItem = async () =>{
    setStatus(STATUS_UPLOADING);

    const post = {
      function:'deleteTodo',
      payload:{
        id:deleteData.id,
        image_url:deleteData.image_url
      }
    }

    const response = await axios.post(`${url}`,post,
      {
        headers: {
          'Content-Type': 'text/plain',
        },
        mode: "no-cors"
      }
    )

    
    if (response.data.success) {
      setOpen(false);
      fetData();  
      setStatus(STATUS_IDLE);
    }

  }

  const updateItem = async (item) =>{
    setStatus(STATUS_UPLOADING);
    console.log(item);
    const post = {
      function:'updateTodo',
      payload:{
        id:item.id,
        name:item.name,
        description:item.description,
        price:item.price,
        category:item.category,        

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

    if (response.data.success) {
                
        toast.success(response.data.message);
        setShowUpdate(false);
        fetData(); 
        setStatus(STATUS_IDLE);
    }
    else{
        toast.error(response.data.message)
    }
    

  }


  const handleFilter = (event) =>{
    const newData = filterRecords.filter(row => row.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
                                                row.description.toLowerCase().includes(event.target.value.toLowerCase()) ||
                                                row.category.toLowerCase().includes(event.target.value.toLowerCase()));
    setRecords(newData);
  }


  useEffect(()=>{
    fetData();   
    
  },[])

  return (
    <div style={{padding:"10px",backgroundColor:"gray",width:1500}}>
      
      <ConfirmBox
        open={open}
        closeDialog={() => setOpen(false)}
        title={deleteData?.name}
        deleteFunction={deleteItem}
        status = {status}
      />

    {showUpdate?
      <UpdatePopup 
        setShowUpdate={setShowUpdate} 
        setUpdateData={setUpdateData}
        updateData={updateData}
        updateFunction={updateItem}
        status = {status}/>        
        :<></>
        
    }

      <div style={{display:'flex',justifyContent:'right',height:'40px',marginBottom:'5px'}}>
       <input type="text" placeholder=' Search...' style={{padding:'6px 4px'}} onChange={handleFilter}/>
      </div>
    
        <DataTable
          title="Products From Google Sheet"
          columns={column}
          noDataComponent="There are no records to display"
          data={records}
          customStyles={customStyles}
          pagination
          selectableRows={false} //Hide Checkox
          // fixedHeader
          // responsive
          // persistTableHead>
          >
        </DataTable>

        

    </div>
  )
}

export default ListGoogleSheet