import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsReducer = createSlice({
  name: 'contacts',
  initialState: localStorage.getItem('persist:root')
    ? JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.contacts)
    : [],
  reducers: {
    add(state, { payload }) {
      return [...state, payload];
    },
    remove(state, { payload }) {
      return state.filter(contact => contact.id !== payload);
    },
  },
});

const filterReducer = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter(state, { payload }) {
      return payload;
    },
  },
});

const rootReducers = combineReducers({
  contacts: contactsReducer.reducer,
  filter: filterReducer.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export { store };
export const { add, remove } = contactsReducer.actions;
export const { changeFilter } = filterReducer.actions;
