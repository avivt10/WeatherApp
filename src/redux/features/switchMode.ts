import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { switchModeModel } from "../models/switchMode.model";

const initialState: switchModeModel = {
  onChangeMode: false,
};

const switchModeSlice = createSlice({
  name: "switchButton",
  initialState: initialState,
  // actions to change the state
  reducers: {
    // 
    setChangeMode: (state, action: PayloadAction<boolean>) => {
      state.onChangeMode = action.payload;
    },
  },
});

export const { setChangeMode } = switchModeSlice.actions;
export default switchModeSlice.reducer;
