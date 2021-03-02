import { createSlice } from '@reduxjs/toolkit'
import { SearchSchoolsResult } from '../api/schools/searchSchools'

type summonProfileType = {
  id: number
  uuid: string
  name: string
  profileIconId: number
  tier: string | null
  rank: string | null
  leaguePoints: string | null
  summoner_level: number
}

type userType = {
  id: number
  email: string
  username: string
  summon_profile: summonProfileType
  school_info: SearchSchoolsResult
}

type initialStateType = {
  user: userType | null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null } as initialStateType,
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
