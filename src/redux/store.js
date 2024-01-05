// ** Redux Imports
import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false
    })
  },
  ...applyMiddleware(thunk)
})

export { store }
