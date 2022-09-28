import { Col, TabPanel, Tabs } from "@peersyst/react-native-components";
import MainTab from "module/main/component/navigation/MainTabs/MainTab/MainTab";
import { useState } from "react";
import { MainTabsRoot, TabGroup } from "./MainTabs.styles";
import { MainTabsType as MainTabsProps } from "./MainTabs.types";

const MainTabs = ({ tabs }: MainTabsProps): JSX.Element => {
    const [index, setIndex] = useState(0);
    return (
        <MainTabsRoot>
            <Tabs gap={0} index={index} onIndexChange={setIndex} style={{ flex: 1 }}>
                <TabGroup renderIndicator={true}>
                    {tabs.map(({ title }, index) => {
                        return (
                            <MainTab key={index} index={index}>
                                {title}
                            </MainTab>
                        );
                    })}
                </TabGroup>
                <Col flex={1} style={{ paddingVertical: 10 }}>
                    {tabs.map(({ item }, index) => {
                        return (
                            <TabPanel key={index} index={index}>
                                {item}
                            </TabPanel>
                        );
                    })}
                </Col>
            </Tabs>
        </MainTabsRoot>
    );
};

export default MainTabs;
