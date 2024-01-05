// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const appPostSlice = createSlice({
  name: 'appPost',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    total: 1
  },
  reducers: {
    getPosts: (state, action) => {
      state.allData = action.payload.allData
      state.total = action.payload.total
    },
    getPostFiltered: (state, action) => {
      state.data = action.payload.data
    },
    getPostSearchFiltered: (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total
    }
  }
})
export const { getPosts, getPostFiltered, getPostSearchFiltered } = appPostSlice.actions

export default appPostSlice.reducer
