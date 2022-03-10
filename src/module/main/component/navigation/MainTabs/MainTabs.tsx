import { MainTabsContent } from "./MainTabs.styles";
import { TabGroup, TabPanel, Tabs, Typography } from "react-native-components";
import MainTab from "module/main/component/navigation/MainTabs/MainTab/MainTab";
import { useState } from "react";
import { translate } from "locale";

const MainTabs = (): JSX.Element => {
    const [index, setIndex] = useState(0);

    return (
        <Tabs gap={0} index={index} onIndexChange={setIndex}>
            <TabGroup renderIndicator={false} style={{ justifyContent: "space-between", zIndex: 1 }}>
                <MainTab index={0}>{translate("transactions")}</MainTab>
                <MainTab index={1}>{translate("currencies")}</MainTab>
                <MainTab index={2}>{translate("nfts")}</MainTab>
            </TabGroup>
            <MainTabsContent activeIndex={index}>
                <TabPanel index={0}>
                    <Typography variant="body1">{translate("transactions")}</Typography>
                </TabPanel>
                <TabPanel index={1}>
                    <Typography variant="body1">{translate("currencies")}</Typography>
                </TabPanel>
                <TabPanel index={2}>
                    <Typography variant="body1">{translate("nfts")}</Typography>
                </TabPanel>
            </MainTabsContent>
        </Tabs>
    );
};

export default MainTabs;
