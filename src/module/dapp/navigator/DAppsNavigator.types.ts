export enum DAppScreens {
    HOME = "HOME",
    SEARCH = "SEARCH",
    WEBVIEW = "WEBVIEW",
}

export type DAppsParamsList = {
    [DAppScreens.HOME]: undefined;
    [DAppScreens.SEARCH]: undefined;
    [DAppScreens.WEBVIEW]: { url: string };
};
