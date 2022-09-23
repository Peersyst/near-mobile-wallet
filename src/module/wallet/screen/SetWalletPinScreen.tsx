import useCreateWallet from "../hook/useCreateWallet";
import { useTranslate } from "module/common/hook/useTranslate";
import RepeatNumericPad from "module/common/component/input/RepeatNumericPad/RepeatNumericPad";

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
    return <RepeatNumericPad belowLogo onCancel={onCancel} placeholder={translate("enter_your_pin")} onSuccess={handleRepeatPinSubmit} />;
};

export default SetWalletPinScreen;
