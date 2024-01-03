import {PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface switchConvertTempModel{
    onChangeTemp: boolean
}

const initialState : switchConvertTempModel = {
  onChangeTemp: false
}

const switchConvertTempSlice = createSlice({
    name:'switchConvertTemperature',
    initialState:initialState,
    // actions to change the state
    reducers:{
      setChangeTypeTemperature:(state,action: PayloadAction<boolean>) => {
            state.onChangeTemp = action.payload;
      }
    }
})

export const {
    setChangeTypeTemperature,
} = switchConvertTempSlice.actions;
export default switchConvertTempSlice.reducer;