import useCreateWallet from "module/wallet/hook/useCreateWallet";
import MnemonicPicker from "module/wallet/component/input/MnemonicPicker/MnemonicPicker";
import { Col, useToast } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import Advise from "module/common/component/display/Advise/Advise";
import Button from "module/common/component/input/Button/Button";

export interface PickWalletMnemonicScreenProps {
    onSubmit: () => void;
}

const PickWalletMnemonicScreen = ({ onSubmit }: PickWalletMnemonicScreenProps): JSX.Element => {
    const {
        setIsBackupDone,
        state: { mnemonic },
    } = useCreateWallet();
    const { showToast } = useToast();
    const translate = useTranslate();

    const handleSkip = () => {
        setIsBackupDone(false);
        onSubmit();
    };

    const handleOnSubmit = () => {
        setIsBackupDone(true);
        onSubmit();
    };

    return (
        <Col gap={24}>
            <Advise title={translate("select_in_order")} />
            <MnemonicPicker
                mnemonic={mnemonic!}
                onSuccess={handleOnSubmit}
                onError={() => showToast(translate("incorrect_mnemonic"), { type: "error" })}
            />
            <Button fullWidth variant={"text"} onPress={handleSkip} size="sm">
                {translate("iWillDoItLater")}
            </Button>
        </Col>
    );
};

export default PickWalletMnemonicScreen;
