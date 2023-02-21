import useCreateWallet from "module/wallet/hook/useCreateWallet";
import MnemonicPicker from "module/wallet/component/input/MnemonicPicker/MnemonicPicker";
import { useToast } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import Advise from "module/common/component/display/Advise/Advise";
import { PickWalletMnemonicScreenRoot } from "module/wallet/screen/PickWalletMnemonicScreen/PickWalletMnemonicScreen.styles";

export interface PickWalletMnemonicScreenProps {
    onSubmit: () => void;
}

const PickWalletMnemonicScreen = ({ onSubmit }: PickWalletMnemonicScreenProps): JSX.Element => {
    const {
        state: { mnemonic },
    } = useCreateWallet();
    const { showToast } = useToast();
    const translate = useTranslate();
    return (
        <PickWalletMnemonicScreenRoot>
            <Advise title={translate("select_in_order")} />
            <MnemonicPicker
                mnemonic={mnemonic!}
                onSuccess={onSubmit}
                onError={() => showToast(translate("incorrect_mnemonic"), { type: "error" })}
            />
        </PickWalletMnemonicScreenRoot>
    );
};

export default PickWalletMnemonicScreen;
