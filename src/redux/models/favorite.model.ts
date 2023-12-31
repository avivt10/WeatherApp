export interface favoritePropsModel {
  key: string;
  cityName: string;
  countryName: string;
}

export interface favoriteListModel {
  favorite: favoritePropsModel
}

export interface favoritesListModel {
  favorites: favoritePropsModel[]
}
