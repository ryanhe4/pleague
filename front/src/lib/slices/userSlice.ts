import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'common',
  initialState: { user: null },
  reducers: {
    loadUser(state, action) {
      state.user = action.payload
    }
  }
})

export const { loadUser } = userSlice.actions
export default userSlice.reducer
