import { useState } from "react";
import { TabsProvider } from "./TabsContext";
import { TabsProps } from "./Tabs.types";
import { useControlled } from "@peersyst/react-hooks";
import { Col } from "@peersyst/react-native-components";
import { LayoutRectangle } from "react-native";

export default function Tabs({ index, onIndexChange, initialIndex = 0, style, gap = 20, children }: TabsProps): JSX.Element {
    const [activeIndex, setActiveIndex] = useControlled(initialIndex, index, onIndexChange);
    const [activeLayout, setActiveLayout] = useState<LayoutRectangle>();

    return (
        <Col style={style} gap={gap} flex={1}>
            <TabsProvider
                value={{
                    activeIndex,
                    onTabChange: setActiveIndex,
                    activeLayout,
                    setActiveLayout,
                }}
            >
                {children}
            </TabsProvider>
        </Col>
    );
}
