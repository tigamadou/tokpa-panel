// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const appReportSlice = createSlice({
  name: 'appReport',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    total: 1
  },
  reducers: {
    getReports: (state, action) => {
      state.allData = action.payload.allData
      state.total = action.payload.total
    },
    getReportFiltered: (state, action) => {
      state.data = action.payload.data
    },
    getReportSearchFiltered: (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total
    }
  }
})
export const { getReports, getReportFiltered, getReportSearchFiltered } = appReportSlice.actions

export default appReportSlice.reducer
