import {PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface switchModeModel{
    onChangeMode: boolean
}

const initialState : switchModeModel = {
  onChangeMode: false
}

const switchModeSlice = createSlice({
    name:'switchButton',
    initialState:initialState,
    // actions to change the state
    reducers:{
      setChangeMode:(state,action: PayloadAction<boolean>) => {
            state.onChangeMode = action.payload;
      }
    }
})

export const {
  setChangeMode,
} = switchModeSlice.actions;
export default switchModeSlice.reducer;