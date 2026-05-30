import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  firstName: string;
  lastName: string;
};
const initialState: UserState = {
  firstName: '',
  lastName: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: UserState }>) => {
      state.firstName = action.payload.user.firstName;
      state.lastName = action.payload.user.lastName;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
