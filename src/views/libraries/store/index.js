// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const applibrariesSlice = createSlice({
  name: 'appLibraries',
  initialState: {
    data: [],
    currentPage: 1,
    itemsPerPage: 12,
    total: 0
  },
  reducers: {
    getLibraries: (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total
    },
    getLibraryFiltered: (state, action) => {
      state.data = action.payload.data
    },
    getLibrarySearchFiltered: (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total
    }
  }
})
export const { getLibraries, getLibraryFiltered, getLibrarySearchFiltered } = applibrariesSlice.actions

export default applibrariesSlice.reducer
