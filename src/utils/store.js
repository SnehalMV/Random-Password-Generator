import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import passwordSlice from './passwordSlice';

const rootReducer = combineReducers({
  passwordList: passwordSlice
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer
})

const persistor = persistStore(store)

export { persistor, store }