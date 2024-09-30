export enum DAppScreens {
    HOME = "HOME",
    WEBVIEW = "WEBVIEW",
}

export type DAppsParamsList = {
    [DAppScreens.HOME]: undefined;
    [DAppScreens.WEBVIEW]: { url: string };
};
