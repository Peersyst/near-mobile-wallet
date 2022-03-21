import { Animated } from "react-native-components";
import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { translate } from "locale";
import { useState } from "react";
import useCreateWallet from "../hook/useCreateWallet";

export interface SetWalletPinScreen {
    onCancel?: () => void;
    onSuccess: () => unknown;
    updating?: boolean;
}

const AnimatedNumericPad = Animated.createAnimatedComponent.fade(NumericPad, { duration: 200 });

const SetWalletPinScreen = ({ onCancel, onSuccess, updating }: SetWalletPinScreen): JSX.Element => {
    const [pin, setPin] = useState<string>();
    const [error, setError] = useState(false);
    const { setPin: setWalletPin } = useCreateWallet();

    const handlePinSubmit = (p: string) => {
        setPin(p);
    };

    const handleRepeatPinSubmit = (p: string) => {
        if (p === pin) {
            setWalletPin(p);
            onSuccess();
        } else {
            setError(true);
            setPin(undefined);
        }
    };

    return pin ? (
        <AnimatedNumericPad
            key="repeat_pin"
            in
            onSubmit={handleRepeatPinSubmit}
            onCancel={onCancel}
            placeholder={translate("repeat_pin")}
        />
    ) : (
        <AnimatedNumericPad
            key="set_pin"
            in
            appear
            onSubmit={handlePinSubmit}
            onCancel={onCancel}
            placeholder={error ? translate("pins_did_not_match") : updating ? translate("enter_new_pin") : translate("enter_your_pin")}
        />
    );
};

export default SetWalletPinScreen;
