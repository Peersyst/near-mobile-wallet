import useCreateWallet from "../hook/useCreateWallet";
import RepeatNumericPad from "module/common/component/input/RepeatNumericPad/RepeatNumericPad";
import { useTranslate } from "module/common/hook/useTranslate";

export interface SetWalletPinScreen {
    onCancel?: () => void;
    onSuccess: () => unknown;
}

const SetWalletPinScreen = ({ onCancel, onSuccess }: SetWalletPinScreen): JSX.Element => {
    const { setPin: setWalletPin } = useCreateWallet();
    const translate = useTranslate();
    const handleRepeatPinSubmit = (p: string) => {
        setWalletPin(p);
        onSuccess();
    };
    return <RepeatNumericPad onCancel={onCancel} placeholder={translate("enter_your_pin")} onSuccess={handleRepeatPinSubmit} />;
};

export default SetWalletPinScreen;
