import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    setVitalStatistics: (state, action) => {
      // if (state.userInfo) {
      //   state.userInfo.vitalStatistics = action.payload;
      //   localStorage.setItem('userInfo', JSON.stringify(state.userInfo)); // update localStorage
      // }
      if (state.userInfo) {
        state.userInfo.vitalStatistics = {
          ...state.userInfo.vitalStatistics, // keep existing values
          ...action.payload, // overwrite only provided values
        };
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo)); // update localStorage
      }
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    }
  }
});

export const { setCredentials, setVitalStatistics, logout } = authSlice.actions;

export default authSlice.reducer;