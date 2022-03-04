import { Animated, useTabs } from "react-native-components";
import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { translate } from "locale";
import { CreateWalletScreens } from "module/wallet/CreateWalletNavigatorGroup";
import { useState } from "react";
import useCreateWalletState from "../hook/useCreateWalletState";

const AnimatedNumericPad = Animated.createAnimatedComponent.fade(NumericPad, { duration: 200, appear: true });

const SetWalletPinScreen = (): JSX.Element => {
    const [pin, setPin] = useState<string>();
    const [error, setError] = useState(false);
    const setTab = useTabs()[1];
    const { setPin: setWalletPin } = useCreateWalletState();

    const handleCancel = () => setTab(CreateWalletScreens.SET_WALLET_NAME);

    const handlePinSubmit = (p: string) => {
        setPin(p);
    };

    const handleRepeatPinSubmit = (p: string) => {
        if (p === pin) {
            setWalletPin(p);
            setTab(CreateWalletScreens.WALLET_ADVISES);
        } else {
            setError(true);
            setPin(undefined);
            return false;
        }
    };

    return pin ? (
        <AnimatedNumericPad in={true} onSubmit={handleRepeatPinSubmit} onCancel={handleCancel} placeholder={translate("repeat_pin")} />
    ) : (
        <AnimatedNumericPad
            in={true}
            onSubmit={handlePinSubmit}
            onCancel={handleCancel}
            placeholder={error ? translate("pins_did_not_match") : translate("enter_your_pin")}
        />
    );
};

export default SetWalletPinScreen;
