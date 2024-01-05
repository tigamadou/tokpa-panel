// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const appCommentSlice = createSlice({
  name: 'appComment',
  initialState: {
    data: [],
    total: 1,
    allData: []
  },
  reducers: {
    getComments: (state, action) => {
      state.allData = action.payload.allData
      state.total = action.payload.total
    },
    getCommentFiltered: (state, action) => {
      state.data = action.payload.data
    },
    getCommentSearchFiltered: (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total
    },
    getCommentBlocked: (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total
    }
  }
})
export const { getComments, getCommentFiltered, getCommentSearchFiltered, getCommentBlocked } = appCommentSlice.actions

export default appCommentSlice.reducer
