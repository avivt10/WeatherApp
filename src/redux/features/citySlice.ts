import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISearchModel } from "../../views/weatherView/components/search/models/search.model";

 interface cityModel {
  currentCity: ISearchModel;
}

const initialState: cityModel = {
  currentCity: {
    key: "",
    city: "",
    country: "",
  },
};

const citySlice = createSlice({
  name: "city",
  initialState: initialState,

  // actions to change the state
  reducers: {
    onChangeCurrentCity: (state, action: PayloadAction<cityModel>) => {
      state.currentCity = action.payload.currentCity;
    },
  },
});

export const { onChangeCurrentCity } = citySlice.actions;
export default citySlice.reducer;
