import React,{useState} from 'react'
import {AiOutlinePlus} from 'react-icons/ai';
import {BsTrash3} from 'react-icons/bs';
import {FiEdit} from 'react-icons/fi';
import useSWR from 'swr';
import axios from 'axios';
// import { useCreateTodoMutation } from './service/CurdApi';
import toast, { Toaster } from 'react-hot-toast';

const fetcher = (...args)=>fetch(...args).then((res)=>res.json())

const App = () => {
  const [update,setUpdate]=useState(null)
  const {data,error,isLoading,mutate}= useSWR("http://localhost:8080/api/v1/get-all",fetcher,{
    refreshInterval:10000
  })
  // const [createTodo,responseCreate] = useCreateTodoMutation();


  // console.log(data);
  const [datas,setData]=useState({
    title:'',
    desc:''
  })

  const CreateTodo=async()=>{
    try{
          const res = await axios.post('http://localhost:8080/api/v1/create',datas);
          // console.log(res);
          setData({
            title:'',
            desc:''
          })
          if(!res.data.success)
          {
            return toast.error(res.data.msg)
          }
          else{
            mutate();
            return toast.success(res.data.msg)
          
          }
        
    }catch(e){
      console.log(e.message)
    }
  }

  const deleteTodo=async(id)=>{
    try{
          const res = await axios.delete(`http://localhost:8080/api/v1/delete/${id}`);
          // console.log(res);
          if(!res.data.success)
          {
            return toast.error(res.data.msg)
          }
          else{
            mutate();
            return toast.success(res.data.msg)
          
          }
        
    }catch(e){
      console.log(e.message)
    }
  }

  const onChangeHandler=(e)=>{
    setData({...datas,[e.target.name]:e.target.value})
  }
  const onChangeHandlerUpdate=(e)=>{
    setUpdate({...update,[e.target.name]:e.target.value})

  }

  const updateHandler=(data)=>{
setUpdate(data);
console.log({update});


  }

  const sentUpadte=async()=>{
    try{
      const res = await axios.patch(`http://localhost:8080/api/v1/update/${update._id}`,update);
      // console.log(res);
      if(!res.data.success)
      {
        return toast.error(res.data.msg)
      }
      else{
        mutate();
        setUpdate(null);
        return toast.success(res.data.msg)
      
      }
    
}catch(e){
  console.log(e.message)
}
  }
  return (
    <>
          <section className="h-screen w-full bg-gray-900">
              <h1 className="text-3xl text-white text-center font-serif py-16 underline">Todo List</h1>
            <div className="container">
            {update && <div className="w-full px-10 sm:px-0 sm:w-1/2 m-auto flex flex-col sm:flex-row rounded-md">
               <input type="text" value={update.title}  name="title" onChange={onChangeHandlerUpdate}  className='py-5 w-full px-3  outline-indigo-500 
               focus:outline-none focus:border-none
               placeholder:font-mono  font-extralight' placeholder='Enter Title' />
                 <input type="text" value={update.desc}  name="desc" onChange={onChangeHandlerUpdate}  className='py-5 w-full px-3 sm:mx-3 mt-2 sm:mt-0 outline-indigo-500 
               focus:outline-none focus:border-none
               placeholder:font-mono  font-extralight' placeholder='Enter Todo Description' />

               <button onClick={sentUpadte} className="hover:bg-indigo-500 focus:outline-none focus:border-none rounded-md m-auto mt-3 sm:mt-0 bg-red-400  text-white h-16  w-24 sm:w-1/3 text-center">
                <FiEdit size={30} className="text-center m-auto"/></button>

               </div>}


              {!update && <div className="w-full px-10 sm:px-0 sm:w-1/2 m-auto flex flex-col sm:flex-row rounded-md">
               <input type="text" value={datas.title}  name="title" onChange={onChangeHandler}  className='py-5 w-full px-3  outline-indigo-500 
               focus:outline-none focus:border-none
               placeholder:font-mono  font-extralight' placeholder='Enter Title' />
                 <input type="text" value={datas.desc}  name="desc" onChange={onChangeHandler}  className='py-5 w-full px-3 sm:mx-3 mt-2 sm:mt-0 outline-indigo-500 
               focus:outline-none focus:border-none
               placeholder:font-mono  font-extralight' placeholder='Enter Todo Description' />

               <button onClick={CreateTodo} className="hover:bg-indigo-500 focus:outline-none focus:border-none rounded-md m-auto mt-3 sm:mt-0 bg-red-400  text-white h-16  w-24 sm:w-1/3 text-center">
                <AiOutlinePlus size={30} className="text-center m-auto"/></button>

               </div>}




               <section className=" body-font">
  <div className="container px-10 py-16 mx-auto">
    <div className="flex flex-wrap -m-4">



    {isLoading && <div className="text-center text-white text-2xl">loading....</div>}
         {!isLoading&& data.Todos && data.Todos.length>0 && data.Todos.map((cur,i,arr)=>{
          
          return   <div className="p-4 md:w-1/3 text-black bg-white">
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        
    <div className="p-6">
          <h2 className="font-serif text-2xl font-bold capitalize">{cur.title}</h2>
          <p className="leading-relaxed mb-3 capitalize">{cur.desc}</p>
          <div className="flex items-center flex-wrap justify-evenly">
            
            <BsTrash3 size={30} className="text-red-600 cursor-pointer" onClick={()=>deleteTodo(cur._id)} />
            <FiEdit size={30}  className="text-green-600 cursor-pointer" onClick={()=>updateHandler(cur)} />
          </div>
        </div>
         </div>
       </div>
         }) }
     
    </div>
  </div>
</section>
            </div>
            <Toaster />
          </section>



    </>
  )
}

export default App;