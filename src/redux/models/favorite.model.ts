export interface favoritePropsModel {
  key: number;
  cityName: string;
  countryName: string
}

export interface favoriteListModel {
  favorite: favoritePropsModel
}

export interface favoritesListModel {
  favorites: favoritePropsModel[]
}
