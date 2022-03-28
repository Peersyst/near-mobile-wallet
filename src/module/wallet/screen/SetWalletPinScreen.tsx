import { translate } from "locale";
import useCreateWallet from "../hook/useCreateWallet";
import RepeatNumericPad from "module/common/component/input/RepeatNumericPad/RepeatNumericPad";

export interface SetWalletPinScreen {
    onCancel?: () => void;
    onSuccess: () => unknown;
    updating?: boolean;
}

const SetWalletPinScreen = ({ onCancel, onSuccess }: SetWalletPinScreen): JSX.Element => {
    const { setPin: setWalletPin } = useCreateWallet();
    const handleRepeatPinSubmit = (p: string) => {
        setWalletPin(p);
        onSuccess();
    };
    return <RepeatNumericPad onCancel={onCancel} placeholder={translate("enter_new_pin")} onSuccess={handleRepeatPinSubmit} />;
};

export default SetWalletPinScreen;
