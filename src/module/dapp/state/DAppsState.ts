export interface StoredDApp {
    name: string;
    url: string;
    logoUrl: string;
}

export interface DAppsState {
    favourites: StoredDApp[];
}

export const defaulDAppsState: DAppsState = {
    favourites: [],
};
