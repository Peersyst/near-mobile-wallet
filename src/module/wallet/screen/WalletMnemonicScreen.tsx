import { WalletService } from "near-peersyst-sdk";
import { Col } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import MnemonicList from "module/wallet/component/display/MnemonicList/MnemonicList";
import { useMemo } from "react";
import { useTranslate } from "module/common/hook/useTranslate";
import Advise from "module/common/component/display/Advise/Advise";

export interface WalletMnemonicScreenProps {
    onNextScreen: () => void;
}

const WalletMnemonicScreen = ({ onNextScreen }: WalletMnemonicScreenProps): JSX.Element => {
    const { setMnemonic } = useCreateWallet();
    const translate = useTranslate();
    const handleNext = () => {
        setMnemonic(mnemonic);
        onNextScreen();
    };

    const mnemonic = useMemo(() => {
        const mnemonicStr = WalletService.createNewMnemonic();
        return mnemonicStr.split(" ");
    }, []);

    return (
        <Col flex={1} gap={24} justifyContent="flex-end">
            <Advise title={translate("keep_this_safe")} />
            <MnemonicList mnemonic={mnemonic} />
            <Button fullWidth onPress={handleNext}>
                {translate("next")}
            </Button>
        </Col>
    );
};

export default WalletMnemonicScreen;
