import { createSlice } from '@reduxjs/toolkit';
import { setAccessToken } from '../../services/apiClient';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user || state.user;
      if (token !== undefined) {
        state.token = token;
        setAccessToken(token);
      }
      state.isAuthenticated = !!state.user;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      setAccessToken(null);
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
});

export const { setCredentials, logOut, setUser } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserRole = (state) => state.auth.user?.role;

export default authSlice.reducer;
