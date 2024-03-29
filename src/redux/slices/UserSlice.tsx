import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from '../../vite-env';

const initialState: IUserState = {
  name: '',
  lastname: '',
  phone: '',
  email: '',
  rol: '',
  accessToken: '',
  refreshToken: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserState>) => action.payload,
    logout: () => initialState
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
