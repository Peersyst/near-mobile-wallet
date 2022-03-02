import { createContext } from "react";
import { LayoutRectangle } from "react-native";

export interface TabsContextInterface {
    activeIndex: number;
    onTabChange: (index: number) => void;
    activeLayout: LayoutRectangle | undefined;
    setActiveLayout: (layout: LayoutRectangle) => void;
}

export const TabsContext = createContext<TabsContextInterface>({
    activeIndex: 0,
    onTabChange: () => undefined,
    activeLayout: undefined,
    setActiveLayout: () => undefined,
});
export const TabsProvider = TabsContext.Provider;
export const TabsConsumer = TabsContext.Consumer;
