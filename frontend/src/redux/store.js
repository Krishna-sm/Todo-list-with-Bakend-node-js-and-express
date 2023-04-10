import {configureStore} from '@reduxjs/toolkit';
import { CrudApi } from '../service/CurdApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
    reducer:{
        [CrudApi.reducerPath]:CrudApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CrudApi.middleware)

})

setupListeners(store.dispatch)