// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const appErrorSlice = createSlice({
  name: 'appError',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    total: 1
  },
  reducers: {
    getErrors: (state, action) => {
      state.allData = action.payload.allData
      state.total = action.payload.total
    },
    getErrorFiltered: (state, action) => {
      state.data = action.payload.data
    },
    getErrorSearchFiltered: (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total
    }
  }
})
export const { getErrors, getErrorFiltered, getErrorSearchFiltered } = appErrorSlice.actions

export default appErrorSlice.reducer
