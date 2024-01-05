// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const appPageSlice = createSlice({
  name: 'appPage',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    total: 1
  },
  reducers: {
    getPages: (state, action) => {
      state.allData = action.payload.allData
      state.total = action.payload.total
    },
    getPageFiltered: (state, action) => {
      state.data = action.payload.data
    },
    getPageSearchFiltered: (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total
    }
  }
})
export const { getPages, getPageFiltered, getPageSearchFiltered } = appPageSlice.actions

export default appPageSlice.reducer
