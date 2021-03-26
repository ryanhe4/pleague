import { createSlice } from '@reduxjs/toolkit'
import { schoolListType } from '../api/schools/searchSchools'
import { summonerType } from '../api/summoner/searchSummoner'

type initialStateType = {
  schoolList: schoolListType[] | null
  summonerList: summonerType[] | null
  currentSchool: string
  prevable: boolean
  nextable: boolean
  summonerTopRank: number
}

const rankSlice = createSlice({
  name: 'rank',
  initialState: {
    schoolList: null,
    summonerList: null,
    currentSchool: '1',
    nextable: false,
    prevable: false,
    summonerTopRank: 1
  } as initialStateType,
  reducers: {
    setSchoolList: (state, action) => {
      state.schoolList = action.payload
    },
    setSummonerList: (state, action) => {
      state.summonerList = action.payload
      state.prevable = false
      if (action.payload.length === 3) {
        state.nextable = true
      } else {
        state.nextable = false
      }
    },
    setCurrentSchool: (state, action) => {
      state.currentSchool = action.payload
    },
    loadSummonerList: (state, action) => {
      state.summonerList?.push(...action.payload)
      state.prevable = true
      if (action.payload.length < 3) {
        state.nextable = false
      }
      state.summonerTopRank = state.summonerTopRank + 3
    },
    addSummonTopRank: (state) => {
      state.summonerTopRank += 3
    },
    prevSummonerList: (state) => {
      state.summonerTopRank -= 3
      if (state.summonerTopRank === 1) {
        state.prevable = false
      }

      if (state.summonerList && state.summonerList.length >= state.summonerTopRank + 3) {
        state.nextable = true
      }
    }
  }
})

export const {
  setSchoolList,
  setSummonerList,
  setCurrentSchool,
  loadSummonerList,
  addSummonTopRank,
  prevSummonerList
} = rankSlice.actions
export default rankSlice.reducer
