import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth-slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
   key: 'root',
   storage,
 }
 
const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
   reducer: {
      persistedReducer,
   },
   devTools: process.env.NODE_ENV !== 'production',
   middleware: [thunk],

})


export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
