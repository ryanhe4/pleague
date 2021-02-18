import {combineReducers } from "@reduxjs/toolkit"
import commonSlice from './slices/commonSlice'

const reducer = combineReducers({
  commonSlice
})

export type ReducerType = ReturnType<typeof reducer>
export default reducer
