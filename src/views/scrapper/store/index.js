// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const appScrapperSlice = createSlice({
  name: 'appScrapper',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    total: 1
  },
  reducers: {
    getScrappers: (state, action) => {
      state.allData = action.payload.allData
      state.total = action.payload.total
    },
    getScrapperFiltered: (state, action) => {
      state.data = action.payload.data
    },
    getScrapperSearchFiltered: (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total
    }
  }
})
export const { getScrappers, getScrapperFiltered, getScrapperSearchFiltered } = appScrapperSlice.actions

export default appScrapperSlice.reducer
