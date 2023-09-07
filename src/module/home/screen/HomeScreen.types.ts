export enum HomeScreenDeepLinkParams {
    TYPE = "type",
    ID = "id",
}

export type HomeScreenParams = Record<HomeScreenDeepLinkParams, string | undefined>;
