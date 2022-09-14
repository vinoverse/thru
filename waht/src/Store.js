import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    account: ''
};

const walletaccount = createSlice({
  name: 'walletaccount',
  initialState,
  reducers: {
    setAccount(state, action) {
      state.account = action.payload;
    }
  }
});

export const { setAccount } = walletaccount.actions;
export default walletaccount.reducer;