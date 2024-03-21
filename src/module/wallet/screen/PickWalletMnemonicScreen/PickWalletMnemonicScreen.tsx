import useCreateWallet from "module/wallet/hook/useCreateWallet";
import MnemonicPicker from "module/wallet/component/input/MnemonicPicker/MnemonicPicker";
import { useToast } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import Advise from "module/common/component/display/Advise/Advise";
import { PickWalletMnemonicScreenRoot } from "module/wallet/screen/PickWalletMnemonicScreen/PickWalletMnemonicScreen.styles";
import Button from "module/common/component/input/Button/Button";

export interface PickWalletMnemonicScreenProps {
    onSubmit: () => void;
    onNextScreen: () => void;
}

const PickWalletMnemonicScreen = ({ onSubmit, onNextScreen }: PickWalletMnemonicScreenProps): JSX.Element => {
    const {
        setIsBackupDone,
        state: { mnemonic },
    } = useCreateWallet();
    const { showToast } = useToast();
    const translate = useTranslate();

    const handleSkip = async () => {
        setIsBackupDone(false);
        onNextScreen();
    };

    const handleOnSubmit = () => {
        setIsBackupDone(true);
        onSubmit();
    };

    return (
        <PickWalletMnemonicScreenRoot>
            <Advise title={translate("select_in_order")} />
            <MnemonicPicker
                mnemonic={mnemonic!}
                onSuccess={handleOnSubmit}
                onError={() => showToast(translate("incorrect_mnemonic"), { type: "error" })}
            />
            <Button fullWidth variant={"text"} onPress={handleSkip}>
                {translate("IWillDoItLater")}
            </Button>
        </PickWalletMnemonicScreenRoot>
    );
};

export default PickWalletMnemonicScreen;
