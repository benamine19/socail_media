import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

import {jwtDecode} from 'jwt-decode';
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/users/login/', {
        email,
        password,
      });
      console.log('response.data', response.data);
      localStorage.setItem('access', JSON.stringify(response.data.access));
      localStorage.setItem('refresh', JSON.stringify(response.data.refresh));

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const user_loginSlice = createSlice({
  name: 'user_login',
  initialState: {
    user: JSON.parse(localStorage.getItem('access'))?jwtDecode(JSON.parse(localStorage.getItem('access'))):null,
    isLoading: false,
    error: null,
  },
  reducers: {
    when_user_reload_page: (state, action) => {
      console.log('when_user_reload_page payload :', action.payload);
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        try {
          const localStorageAccessToken = JSON.parse(localStorage.getItem('access'));
          if (localStorageAccessToken) {
            const utilisateurDecode = jwtDecode(localStorageAccessToken);
            state.user =utilisateurDecode // Fusionner les données de l'utilisateur avec le nom d'utilisateur
          }
        } catch (error) {
          console.error('Erreur lors du décodage du jeton d access:', error);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.user = null;
      });
  },
});


export const { when_user_reload_page } = user_loginSlice.actions;

export default user_loginSlice.reducer;