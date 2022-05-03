import { WalletService } from "@peersyst/ckb-peersyst-sdk";
import { Col, Typography } from "react-native-components";
import Card from "module/common/component/surface/Card/Card";
import { translate } from "locale";
import Button from "module/common/component/input/Button/Button";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import MnemonicList from "module/wallet/component/display/MnemonicList/MnemonicList";
import { useMemo } from "react";

export interface WalletMnemonicScreenProps {
    onNextScreen: () => void;
}

const WalletMnemonicScreen = ({ onNextScreen }: WalletMnemonicScreenProps): JSX.Element => {
    const { setMnemonic } = useCreateWallet();

    const handleNext = () => {
        setMnemonic(mnemonic);
        onNextScreen();
    };

    const mnemonic = useMemo(() => {
        const mnemonicStr = WalletService.createNewMnemonic();
        return mnemonicStr.split(" ");
    }, []);

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
