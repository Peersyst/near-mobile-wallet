import { useContext, useEffect, useState } from "react";
import { TabIndicatorRoot } from "./TabIndicator.styles";
import { TabsContext } from "../../TabsContext";
import { TabIndicatorProps } from "./TabIndicator.types";

export default function TabIndicator({ tabGroupLayout, style }: TabIndicatorProps): JSX.Element {
    const [tabWidth, setTabWidth] = useState<number>(0);
    const [tabX, setTabX] = useState<number>(0);
    const [tabGroupX, setTabGroupX] = useState<number>(0);

    const { activeLayout } = useContext(TabsContext);

    useEffect(() => {
        const { width, x } = activeLayout || {
            width: 0,
            x: 0,
        };
        console.log(activeLayout);
        setTabWidth(width);
        setTabX(x);
        setTabGroupX(tabGroupLayout?.x || 0);
    }, [activeLayout, tabGroupLayout]);

    return <TabIndicatorRoot style={style} width={tabWidth} position={tabX - tabGroupX} />;
}
