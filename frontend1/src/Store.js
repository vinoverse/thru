import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    account: '',
    domain: '',
};

const walletaccount = createSlice({
  name: 'walletaccount',
  initialState,
  reducers: {
    setAccount(state, action) {
      state.account = action.payload;
    },
    setDomain(state, action) {
      state.domain = action.payload;
    }
  }
});

export const { setAccount, setDomain } = walletaccount.actions;
export default walletaccount.reducer;