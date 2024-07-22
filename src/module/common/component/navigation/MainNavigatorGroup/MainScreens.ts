import { HomeScreenParams } from "../../../../home/screen/HomeScreen.types";

export enum MainScreens {
    MAIN = "Main",
    SETTINGS = "Settings",
    FIAT_ORDERS = "FiatOrders",
    HOME = "Main/Home",
    STAKING = "Main/Staking",
    NEWS = "Main/News",
    DAPPS = "Main/DApps",
    FAQS = "Main/FAQs",
}

export type MainNavigatorGroupParams = {
    [MainScreens.MAIN]: undefined;
    [MainScreens.SETTINGS]: undefined;
    [MainScreens.FIAT_ORDERS]: undefined;
    [MainScreens.HOME]: HomeScreenParams;
    [MainScreens.STAKING]: undefined;
    [MainScreens.NEWS]: undefined;
    [MainScreens.DAPPS]: undefined;
    [MainScreens.FAQS]: undefined;
};
