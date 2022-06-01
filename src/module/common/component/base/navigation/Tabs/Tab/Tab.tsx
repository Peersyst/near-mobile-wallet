import { useContext, useEffect, useState } from "react";
import { TabsContext } from "../TabsContext";
import { TabRoot } from "./Tab.styles";
import { TabProps } from "./Tab.types";
import { LayoutChangeEvent, LayoutRectangle, TouchableWithoutFeedback } from "react-native";

export default function Tab({ index, style: { active: activeStyle, ...style } = {}, children }: TabProps): JSX.Element {
    const [layout, setLayout] = useState<LayoutRectangle>();
    const { activeIndex, onTabChange, setActiveLayout } = useContext(TabsContext);

    const isActive = activeIndex === index;

    const handleLayout = ({ nativeEvent: { layout: newLayout } }: LayoutChangeEvent) => {
        setLayout(newLayout);
    };

    useEffect(() => {
        if (isActive && layout) setActiveLayout(layout);
    }, [isActive, layout, setActiveLayout]);

    return (
        <TouchableWithoutFeedback onPress={() => onTabChange(index)}>
            <TabRoot style={{ ...style, ...(isActive && activeStyle) }} onLayout={handleLayout}>
                {children}
            </TabRoot>
        </TouchableWithoutFeedback>
    );
}
