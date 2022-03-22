import { Col, useTabs } from "react-native-components";
import { translate } from "locale";
import AdviseCardGroup from "module/common/component/display/AdviseCardGroup/AdviseCardGroup";
import { useState } from "react";
import { CreateWalletScreens } from "module/wallet/navigator/CreateWalletNavigatorGroup";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import Button from "module/common/component/input/Button/Button";

const WalletAdvisesScreen = (): JSX.Element => {
    const [index, setIndex] = useState(0);
    const setTab = useTabs()[1];
    const advises = [
        { title: translate("advise1_title"), text: translate("advise1_text") },
        { title: translate("advise2_title"), text: translate("advise2_text") },
        {
            title: translate("advise3_title"),
            text: translate("advise3_text"),
        },
    ];

    const handleNext = () => setTab(CreateWalletScreens.WALLET_MNEMONIC);

    return (
        <Col flex={1} gap={30}>
            <AdviseCardGroup index={index} onIndexChange={setIndex} advises={advises} />
            {index === 2 ? (
                <CountdownButton seconds={5} fullWidth variant="outlined" style={{ marginHorizontal: 20 }} onPress={handleNext}>
                    {translate("generate_mnemonic")}
                </CountdownButton>
            ) : (
                <Button fullWidth variant="outlined" style={{ marginHorizontal: 20 }} disabled>
                    {translate("generate_mnemonic")}
                </Button>
            )}
        </Col>
    );
};

export default WalletAdvisesScreen;
