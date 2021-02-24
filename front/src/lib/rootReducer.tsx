import { combineReducers } from '@reduxjs/toolkit'
import commonSlice from './slices/commonSlice'
import userSlice from './slices/userSlice'

const reducer = combineReducers({
  commonSlice, userSlice
})

export type ReducerType = ReturnType<typeof reducer>
export default reducer
