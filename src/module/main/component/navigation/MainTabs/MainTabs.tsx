import { MainTabsContent } from "./MainTabs.styles";
import { TabGroup, TabPanel, Tabs } from "react-native-components";
import MainTab from "module/main/component/navigation/MainTabs/MainTab/MainTab";
import { useState } from "react";
import { translate } from "locale";
import TransactionsList from "module/transaction/component/core/TransactionsList/TransactionsList";
import TokensList from "module/token/component/core/TokensList/TokensList";
import NftsList from "module/nft/component/core/NftsList/NftsList";

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
                    <TransactionsList />
                </TabPanel>
                <TabPanel index={1}>
                    <TokensList />
                </TabPanel>
                <TabPanel index={2}>
                    <NftsList />
                </TabPanel>
            </MainTabsContent>
        </Tabs>
    );
};

export default MainTabs;
