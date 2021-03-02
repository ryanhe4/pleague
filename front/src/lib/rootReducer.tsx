import { combineReducers } from '@reduxjs/toolkit'
import commonSlice from './slices/commonSlice'
import userSlice from './slices/userSlice'
import rankSlice from './slices/rankSlice'

const reducer = combineReducers({
  commonSlice, userSlice, rankSlice
})

export type ReducerType = ReturnType<typeof reducer>
export default reducer
