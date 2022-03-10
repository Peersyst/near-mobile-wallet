import generateMnemonic from "module/wallet/mock/generateMnemonic";
import { Col, Typography, useTabs } from "react-native-components";
import Card from "module/common/component/surface/Card/Card";
import { translate } from "locale";
import Button from "module/common/component/input/Button/Button";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { CreateWalletScreens } from "module/wallet/navigator/CreateWalletNavigatorGroup";
import MnemonicList from "module/wallet/component/display/MnemonicList/MnemonicList";

const WalletMnemonicScreen = (): JSX.Element => {
    const setTab = useTabs()[1];
    const { setMnemonic } = useCreateWallet();

    const handleNext = () => {
        setMnemonic(mnemonic);
        setTab(CreateWalletScreens.PICK_WALLET_MNEMONIC);
    };

    const mnemonic = generateMnemonic();

    return (
        <Col flex={1} gap={30} justifyContent="flex-end">
            <Card>
                <Col gap={30}>
                    <Typography variant="h3" fontWeight="bold" textTransform="uppercase" textAlign="center">
                        {translate("keep_this_safe")}
                    </Typography>
                    <MnemonicList mnemonic={mnemonic} />
                </Col>
            </Card>
            <Button fullWidth variant="outlined" style={{ marginHorizontal: 20 }} onPress={handleNext}>
                {translate("next")}
            </Button>
        </Col>
    );
};

export default WalletMnemonicScreen;
