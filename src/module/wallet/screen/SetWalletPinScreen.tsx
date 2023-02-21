import useCreateWallet from "../hook/useCreateWallet";
import { useTranslate } from "module/common/hook/useTranslate";
import RepeatNumericPad from "module/common/component/input/RepeatNumericPad/RepeatNumericPad";
import { useEffect } from "react";

export interface SetWalletPinScreen {
    onCancel?: () => void;
    onSuccess: () => unknown;
}

const SetWalletPinScreen = ({ onCancel, onSuccess }: SetWalletPinScreen): JSX.Element => {
    const {
        setPin: setWalletPin,
        state: { pin },
    } = useCreateWallet();
    const translate = useTranslate();

    const handleRepeatPinSubmit = (p: string) => {
        setWalletPin(p);
    };

    useEffect(() => {
        if (pin) {
            onSuccess();
        }
    }, [pin, onSuccess]);

    return <RepeatNumericPad belowLogo onCancel={onCancel} placeholder={translate("enter_your_pin")} onSuccess={handleRepeatPinSubmit} />;
};

export default SetWalletPinScreen;
