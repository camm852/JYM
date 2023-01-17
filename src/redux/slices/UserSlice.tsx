import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from '../../vite-env';

const initialState: IUserState = {
  name: '',
  accesToken: 'ff',
  typeUser: 'user'
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {},
    logout: (state) => {}
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
