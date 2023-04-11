const TodoModel = require('../models/TodoModel');
const createTodo=async(req,res)=>{
            const {title,desc} = req.body;

            if(!title)
            {
              return  res.status(200).json({success:false,msg:"Todo is reqired"})
            }

            if(!desc)
            {
              return  res.status(200).json({success:false,msg:"Desc is reqired"})
            }

          const todo = await  TodoModel.create({title,desc});

          return res.status(201).json({success:200,msg:"create successfully",todo})

}

const allTodo=async(req,res)=>{
  if(!req.headers['authorization'])
  {
    return res.status(401).json({success:401,msg:"Dont Fetch"})

  }
        const Todos = await TodoModel.find({});
        return res.status(201).json({success:200,msg:"fetch  successfully",Todos})
}

const updateTodo=async(req,res)=>{
    try {
                    const {id} = req.params;
                    const {title,desc}=req.body;
                    if(!title)
                    {
                      return  res.status(200).json({success:false,msg:"Todo is reqired"})
                    }
        
                    if(!desc)
                    {
                      return  res.status(200).json({success:false,msg:"Desc is reqired"})
                    }
                    const data = await TodoModel.findByIdAndUpdate(id,{title,desc});
                    if(!data)
                    {
                      return  res.status(200).json({success:false,msg:"todo not found"})

                    }
                    res.status(200).json({success:200,msg:"update success"})
    } catch (error) {
        return res.status(404).json({success:false,msg:"Todo not found"})
    
    }
}

const deleteTodo=async(req,res)=>{
    try {
        const {id} = req.params;
      
        const data = await TodoModel.findByIdAndDelete(id);
        if(!data)
        {
          return  res.status(200).json({success:false,msg:"todo not found"})

        }
        res.status(200).json({success:200,msg:"delete success"})
} catch (error) {
return res.status(404).json({success:false,msg:"Todo not found"})

}
}
module.exports={
    createTodo,
    allTodo,
    updateTodo,
    deleteTodo
}