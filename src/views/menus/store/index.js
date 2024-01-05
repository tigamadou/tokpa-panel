// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const appMenuSlice = createSlice({
  name: 'appMenu',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    total: 1
  },
  reducers: {
    getMenus: (state, action) => {
      state.allData = action.payload.allData
      state.total = action.payload.total
    },
    getMenuFiltered: (state, action) => {
      state.data = action.payload.data
    },
    getMenuSearchFiltered: (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total
    }
  }
})
export const { getMenus, getMenuFiltered, getMenuSearchFiltered } = appMenuSlice.actions

export default appMenuSlice.reducer
