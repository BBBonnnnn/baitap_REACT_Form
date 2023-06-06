import {configureStore} from '@reduxjs/toolkit'
export const store = configureStore({
  reducer: {
    inputReducer: (state =100)=>state,
    arrSinhVienReducer: (state =100)=>state,
    
  }
})