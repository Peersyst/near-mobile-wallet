import { TabsConsumer } from "../TabsContext";
import { TabPanelRoot } from "./TabPanel.styles";
import { TabPanelProps } from "./TabPanel.types";

export default function TabPanel({ index, style, children }: TabPanelProps): JSX.Element {
    return (
        <TabsConsumer>
            {({ activeIndex }) => <>{activeIndex === index && <TabPanelRoot style={style}>{children}</TabPanelRoot>}</>}
        </TabsConsumer>
    );
}
