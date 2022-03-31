import { MainTabsContent } from "./MainTabs.styles";
import { TabGroup, TabPanel, Tabs } from "react-native-components";
import MainTab from "module/main/component/navigation/MainTabs/MainTab/MainTab";
import { useState } from "react";
import { MainTabsType as MainTabsProps } from "./MainTabs.types";

const MainTabs = ({ tabs }: MainTabsProps): JSX.Element => {
    const [index, setIndex] = useState(0);
    return (
        <Tabs gap={0} index={index} onIndexChange={setIndex}>
            <TabGroup renderIndicator={false} style={{ justifyContent: "space-between", zIndex: 1 }}>
                {tabs.map(({ title }, index) => {
                    return (
                        <MainTab key={index} index={index}>
                            {title}
                        </MainTab>
                    );
                })}
            </TabGroup>
            <MainTabsContent numberOfTabs={tabs.length} activeIndex={index}>
                {tabs.map(({ item }, index) => {
                    return (
                        <TabPanel key={index} index={index}>
                            {item}
                        </TabPanel>
                    );
                })}
            </MainTabsContent>
        </Tabs>
    );
};

export default MainTabs;
