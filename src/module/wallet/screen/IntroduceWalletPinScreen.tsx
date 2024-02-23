import { Animated } from "@peersyst/react-native-components";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useLogoPageFlex, useLogoPageGradient } from "module/common/component/layout/LogoPage/LogoPageContext";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import useTranslate from "module/common/hook/useTranslate";
import DarkThemeProvider from "module/common/component/util/ThemeProvider/DarkThemeProvider";
import BiometricNumericPad from "module/common/component/input/BiometricNumericPad/BiometricNumericPad";
import ControllerFactory from "refactor/ui/adapter/ControllerFactory";

const AnimatedBiometricsNumericPad = Animated.createAnimatedComponent.fade(BiometricNumericPad, { duration: 200, delay: 400 });

const SetWalletPinScreen = (): JSX.Element => {
    const translate = useTranslate();
    const [error, setError] = useState(false);
    const setWalletState = useSetRecoilState(walletState);

    useLogoPageFlex(0.4);
    useLogoPageGradient(false);

    const handleSuccess = (pin?: string) => {
        // <<< refactor
        ControllerFactory.authController.login(pin);
        // refactor >>>
        setWalletState((state) => ({ ...state }));
    };

    const handlePinSubmit = async (pin: string) => {
        const storedPin = await WalletStorage.getPin();
        if (storedPin === pin) {
            handleSuccess(pin);
        } else {
            setError(true);
            notificationAsync(NotificationFeedbackType.Error);
        }
    };

    // Required to get the animation working
    const [animateNumericPad, setAnimateNumericPad] = useState(false);
    useEffect(() => {
        setAnimateNumericPad(true);
    }, []);

    return (
        <DarkThemeProvider>
            <AnimatedBiometricsNumericPad
                belowLogo
                in={animateNumericPad}
                error={error}
                onSubmit={handlePinSubmit}
                onBiometricsSuccess={handleSuccess}
                placeholder={translate("enter_your_pin")}
            />
        </DarkThemeProvider>
    );
};

export default SetWalletPinScreen;
