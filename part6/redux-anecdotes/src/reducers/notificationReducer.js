import { createSlice } from "@reduxjs/toolkit";


const notifications = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    set: (state, action) => {
      return state = action.payload;
    },
    clear: (state) => {
      return null;
    },
  },
});
// TO DO IMPLEMENT NOTIFICATION SETTER AS ACTION CREATOR




export const { set, clear } = notifications.actions;

export const setNotif = (a,b) => {
  return async dispatch => {
    if (typeof a !== 'string' || !Number.isInteger(b)){
     console.log('WRONG NOTIFICATION FORMAT')
    }
     await dispatch(set(a))
      setTimeout(() => {
        dispatch(clear())
      }, b *1000)
  }

}

export default notifications.reducer;
