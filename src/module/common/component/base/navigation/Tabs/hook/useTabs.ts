import { useContext } from "react";
import { TabsContext } from "../TabsContext";

export default function useTabs(): [number, (index: number) => void] {
    const { activeIndex, onTabChange } = useContext(TabsContext);
    return [activeIndex, onTabChange];
}
