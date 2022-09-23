import { Animated } from "@peersyst/react-native-components";
import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useLogoPageFlex } from "module/common/component/layout/LogoPage/LogoPageContext";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import { useTranslate } from "module/common/hook/useTranslate";

const AnimatedNumericPad = Animated.createAnimatedComponent.fade(NumericPad, { duration: 200, appear: true });

const SetWalletPinScreen = (): JSX.Element => {
    const translate = useTranslate();
    const [error, setError] = useState(false);
    const setWalletState = useSetRecoilState(walletState);
    useLogoPageFlex(0.1);
    const handlePinSubmit = async (pin: string) => {
        const storedPin = await WalletStorage.getPin();
        if (storedPin === pin) {
            setWalletState((state) => ({ ...state, isAuthenticated: true }));
        } else {
            setError(true);
            notificationAsync(NotificationFeedbackType.Error);
        }
    };

    return <AnimatedNumericPad in={true} error={error} onSubmit={handlePinSubmit} placeholder={translate("enter_your_pin")} />;
};

export default SetWalletPinScreen;
