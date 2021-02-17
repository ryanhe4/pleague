import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import reducer from './rootReducer'
import logger from 'redux-logger'

const middleware = [...getDefaultMiddleware(), logger]

export const store = configureStore({
  reducer,
  middleware
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
