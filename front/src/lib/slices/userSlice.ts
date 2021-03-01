import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null },
  reducers: {
    loadUser(state, action) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
    }
  }
})

export const { loadUser, clearUser } = userSlice.actions
export default userSlice.reducer
