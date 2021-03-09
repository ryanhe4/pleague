import { createSlice } from '@reduxjs/toolkit'
import { schoolListType } from '../api/schools/searchSchools'
import { summonerType } from '../api/summoner/searchSummoner'

type initialStateType = {
  schoolList: schoolListType[] | null
  summonerList: summonerType[] | null
  currentSchool: string
}

const rankSlice = createSlice({
  name: 'rank',
  initialState: {
    schoolList: null,
    summonerList: null,
    currentSchool: '1'
  } as initialStateType,
  reducers: {
    setSchoolList: (state, action) => {
      state.schoolList = action.payload
    },
    setSummonerList: (state, action) => {
      state.summonerList = action.payload
    },
    setCurrentSchool: (state, action) => {
      state.currentSchool = action.payload
    }
  }
})

export const { setSchoolList, setSummonerList, setCurrentSchool } = rankSlice.actions
export default rankSlice.reducer
