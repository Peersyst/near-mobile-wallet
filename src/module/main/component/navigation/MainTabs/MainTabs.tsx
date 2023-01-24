import { Col, TabPanel, Tabs } from "@peersyst/react-native-components";
import MainTab from "module/main/component/navigation/MainTabs/MainTab/MainTab";
import { useState } from "react";
import { TabGroup } from "./MainTabs.styles";
import { MainTabsType as MainTabsProps } from "./MainTabs.types";
import { LinearGradient } from "expo-linear-gradient";
import useWalletGradient from "module/wallet/hook/useWalletGradient";

const MainTabs = ({ tabs }: MainTabsProps): JSX.Element => {
    const [index, setIndex] = useState(0);
    const [startColor, endColor] = useWalletGradient();

    return (
        <Tabs gap={0} index={index} onIndexChange={setIndex} style={{ flex: 1 }}>
            <TabGroup
                renderIndicator={true}
                indicator={<LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={[startColor, endColor]} />}
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
                        <TabPanel key={index} index={index}>
                            {item}
                        </TabPanel>
                    );
                })}
            </Col>
        </Tabs>
    );
};

export default MainTabs;
