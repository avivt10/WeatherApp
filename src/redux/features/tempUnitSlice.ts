import { createSlice } from "@reduxjs/toolkit";
import { ITempUnitModel } from "../models/tempUnit.model";

const initialState: ITempUnitModel = {
  unitMetric: true
};

const tempUnitSlice = createSlice({
  name: 'tempUnit',
  initialState: initialState,

  // actions to change the state
  reducers: {
    onToggleUnit: (state) => {
      state.unitMetric = !state.unitMetric;
    },

    onTurnToCelsius: (state) => {
      state.unitMetric = true;
    },

    onTurnToFahrenheit: (state) => {
      state.unitMetric = false;
    }
  }
});

export const {
  onToggleUnit,
  onTurnToCelsius,
  onTurnToFahrenheit
} = tempUnitSlice.actions;
export default tempUnitSlice.reducer;