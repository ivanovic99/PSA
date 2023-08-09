import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, InitialState } from "../../../types/redux";

const initialState = {
   value: {
      loggedIn: false,
   
      id: null,
   
      isAdmin: false,
   
      email: null,
   
      username: null,
      
      name: null,
      
      lastname: null,
      
      age: 0,
      
      nationality: null,
      
      address: null,
      
      phone: null,

      image: null,
   } as AuthState
} as InitialState

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logOut: (state) => {
         return initialState
      },
      logIn: (state, action: PayloadAction<AuthState>) => {
         state.value = action.payload
         state.value.loggedIn = true
      },
      update: (state, action: PayloadAction<AuthState>) => {
         state.value = action.payload
      }
   }
})

export const { logOut, logIn, update } = authSlice.actions
export default authSlice.reducer
