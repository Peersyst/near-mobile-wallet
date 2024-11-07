import { createContext } from "react";

export interface BasePageContextType {
    header: boolean;
    watchStatusBar: boolean;
}

export const BasePageContext = createContext<BasePageContextType>({ header: false, watchStatusBar: false });
export const BasePageProvider = BasePageContext.Provider;
export const BasePageConsumer = BasePageContext.Consumer;
