export interface FavouriteDApp {
    name: string;
    url: string;
}

export interface IDAppsStorage {
    favourites: FavouriteDApp[];
    history: string[];
}
