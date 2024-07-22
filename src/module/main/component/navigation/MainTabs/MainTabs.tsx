import { Col, TabPanel, Tabs } from "@peersyst/react-native-components";
import MainTab from "module/main/component/navigation/MainTabs/MainTab/MainTab";
import { useState } from "react";
import { TabGroup } from "./MainTabs.styles";
import { MainTabsProps } from "./MainTabs.types";
import { LinearGradient } from "expo-linear-gradient";
import useWalletGradient from "module/wallet/hook/useWalletGradient";

const MainTabs = ({ tabs, style: { tabGroup: tabGroupStyle, tabPanel: tabPanelStyle, ...style } = {} }: MainTabsProps): JSX.Element => {
    const [index, setIndex] = useState(0);
    const gradientColor = useWalletGradient();

    return (
        <Tabs gap={0} index={index} onIndexChange={setIndex} style={{ flex: 1, ...style }}>
            <TabGroup
                renderIndicator={true}
                indicator={<LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={gradientColor} />}
                style={tabGroupStyle}
            >
                {tabs.map(({ title }, index) => {
                    return (
                        <MainTab key={index} index={index}>
                            {title}
                        </MainTab>
                    );
                })}
            </TabGroup>
            <Col flex={1}>
                {tabs.map(({ item }, index) => {
                    return (
                        <TabPanel style={tabPanelStyle} key={index} index={index}>
                            {item}
                        </TabPanel>
                    );
                })}
            </Col>
        </Tabs>
    );
};

export default MainTabs;
