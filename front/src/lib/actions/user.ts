import { createAsyncThunk } from '@reduxjs/toolkit'
import { login, loginData } from '../api/auth/emailAuth'

export const userLogin = createAsyncThunk('user/login', async (data: loginData, { rejectWithValue }) => {
  try {
    return await login(data)
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
