const { createSlice } = require('@reduxjs/toolkit');

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

export { contactsReducer };
