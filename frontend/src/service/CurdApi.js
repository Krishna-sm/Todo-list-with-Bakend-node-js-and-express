import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'



export const CrudApi = createApi({
    reducerPath:'CrudApi',
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:8080/api/v1/"}),
    endpoints:(builder)=>({
        getAllTodos:builder.query({
            query:()=>({
                url:'get-all',
                method:'GET'
            })
        }),
        createTodo:builder.mutation({
            query:(data)=>({
                url:'create',
                method:'POST',
                body:data
            })
        })
    })
})

export const {useGetAllTodosQuery,useCreateTodoMutation} = CrudApi;