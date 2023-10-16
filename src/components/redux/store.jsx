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

const mySliceReducer = createSlice({
  name: 'myValue',
  initialState: 0,
  reducers: {
    increment(state, action) {
      return state + action.payload;
    },
    decrement(state, action) {
      return state - action.payload;
    },
  },
});

const contactsReducer = createSlice({
  name: 'contacts',
  initialState:
    JSON.parse(JSON.parse(localStorage.getItem('persist:root')).contacts) ?? '',
  reducers: {
    add(state, { payload }) {
      state.push(payload);
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
  myValue: mySliceReducer.reducer,
  contacts: contactsReducer.reducer,
  filter: filterReducer.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

// export const increment = createAction('myValue/increment');
// export const decrement = createAction('myValue/decrement');

// const myReducer = createReducer(10, {
//   [increment]: (state, action) => state + action.payload,
//   [decrement]: (state, action) => state - action.payload,
// });

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
export const { increment, decrement } = mySliceReducer.actions;
export const { add, remove } = contactsReducer.actions;
export const { changeFilter } = filterReducer.actions;
