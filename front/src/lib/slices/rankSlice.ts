import { createSlice } from '@reduxjs/toolkit'
import { schoolListType } from '../api/schools/searchSchools'

type initialStateType = {
  schoolList: schoolListType[] | null
}


const rankSlice = createSlice({
  name: 'rank',
  initialState: { schoolList: null } as initialStateType,
  reducers: {
    setSchoolList: (state, action) => {
      state.schoolList = action.payload
    }
  }
})

export const { setSchoolList } = rankSlice.actions
export default rankSlice.reducer
