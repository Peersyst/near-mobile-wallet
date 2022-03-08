import { Col, useTabs } from "react-native-components";
import { translate } from "locale";
import AdviseCardGroup from "module/common/component/display/AdviseCardGroup/AdviseCardGroup";
import { useState } from "react";
import { CreateWalletScreens } from "module/wallet/CreateWalletNavigatorGroup";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import Button from "module/common/component/input/Button/Button";

const WalletAdvisesScreen = (): JSX.Element => {
    const [index, setIndex] = useState(0);
    const setTab = useTabs()[1];
    const advises = [translate("advise1_text"), translate("advise2_text"), translate("advise3_text")];

    const handleNext = () => setTab(CreateWalletScreens.WALLET_MNEMONIC);

    return (
        <Col flex={1} gap={30}>
            <AdviseCardGroup index={index} onIndexChange={setIndex} advises={advises.map((advise) => ({ text: advise }))} />
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
