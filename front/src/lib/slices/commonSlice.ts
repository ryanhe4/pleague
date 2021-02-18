import { createSlice } from '@reduxjs/toolkit'

type commonInitial = {
  screenMask: boolean
}

const initialState:commonInitial = {
  screenMask: false
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    onScreenMask(state) {
      state.screenMask = true
    },
    offScreenMask(state) {
      state.screenMask = false
    }
  }
})

//actions
export const {onScreenMask, offScreenMask} = commonSlice.actions
export default commonSlice.reducer
