import React from "react";
import {configureStore} from "@reduxjs/toolkit";
import userStates from "../states/UserStates";
import fileDataSlice from "../states/fileDataSlice";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
const persistConfig = {
    key: 'root',
    storage,
  }

  export const rootReducers = combineReducers({
    user: userStates,
    fileDataSlice:fileDataSlice,
  });


const persistedReducer = persistReducer(persistConfig, rootReducers)
export default configureStore({
 reducer: persistedReducer,
 devTools:true
}) 