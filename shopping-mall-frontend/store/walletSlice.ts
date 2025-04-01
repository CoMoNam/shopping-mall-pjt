import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
  address: string | null;
}

const initialState: WalletState = {
  address: null,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
    clearWallet(state) {
      state.address = null;
    },
  },
});

export const { setWalletAddress, clearWallet } = walletSlice.actions;
export default walletSlice.reducer;
