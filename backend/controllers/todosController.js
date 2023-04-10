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

          return res.status(201).json({success:true,msg:"create successfully",todo})

}

const allTodo=async(req,res)=>{
        const Todos = await TodoModel.find({});
        return res.status(201).json({success:true,msg:"fetch  successfully",Todos})
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
                    res.status(200).json({success:true,msg:"update success"})
    } catch (error) {
        return res.status(404).json({success:false,msg:"Todo not found"})
    
    }
}

const deleteTodo=async(req,res)=>{
    try {
        const {id} = req.params;
      
        const data = await TodoModel.findByIdAndDelete(id);
        res.status(200).json({success:true,msg:"delete success"})
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