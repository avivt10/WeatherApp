import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { favoritesListModel, favoritePropsModel, favoritesIdModel } from "../models/favorite.model";

const initialState: favoritesListModel = {
  favorites: []
}

const favoriteSlice = createSlice({
    name:'favorite',
    initialState:initialState,
    
    // actions to change the state
    reducers:{
      onAddFavorite: (state, action: PayloadAction<favoritePropsModel>) =>{
        state.favorites.unshift(action.payload);
      },
      onDeleteFavorite: (state,action: PayloadAction<{key: number}>) => {
        state.favorites.filter((favorite) => favorite.key != action.payload.key)
      },
    }
})

export const {
  onAddFavorite,
  onDeleteFavorite
} = favoriteSlice.actions;
export default favoriteSlice.reducer;