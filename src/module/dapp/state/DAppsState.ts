export interface StoredDApp {
    name: string;
    url: string;
    logoUrl: string;
}

export interface IDAppsStorage {
    favourites: StoredDApp[];
    history: string[];
}

export const defaulDAppsState: IDAppsStorage = {
    favourites: [],
    history: [],
};
