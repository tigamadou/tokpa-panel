// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const appCategorieSlice = createSlice({
  name: 'appCategory',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    total: 1
  },
  reducers: {
    getCategories: (state, action) => {
      state.allData = action.payload.allData
      state.total = action.payload.total
    },
    getCategorieFiltered: (state, action) => {
      state.data = action.payload.data
    },
    getCategorieSearchFiltered: (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total
    }
  }
})
export const { getCategories, getCategorieFiltered, getCategorieSearchFiltered } = appCategorieSlice.actions

export default appCategorieSlice.reducer
