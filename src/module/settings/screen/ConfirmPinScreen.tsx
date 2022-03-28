import { translate } from "locale";
import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useState } from "react";
import { Animated, createBackdrop, ExposedBackdropProps } from "react-native-components";
import BaseSettingsModalScreen from "../components/layout/BaseSettingsModal/BaseSettingsModal";

const AnimatedNumericPad = Animated.createAnimatedComponent.fade(NumericPad, { duration: 200, appear: true });

interface ConfirmPinScreenProps extends ExposedBackdropProps {
    onPinConfirmed: any;
}

const ConfirmPinScreen = createBackdrop(({ onPinConfirmed, ...rest }: ConfirmPinScreenProps) => {
    const [error, setError] = useState(false);
    const handleSubmit = async (pin: string) => {
        const storedPin = await WalletStorage.getPin();
        if (pin === storedPin) {
            onPinConfirmed();
        } else {
            setError(true);
        }
    };
    return (
        <BaseSettingsModalScreen title={translate("confirm_your_pin")} {...rest}>
            <AnimatedNumericPad error={error} placeholder={translate("enter_your_pin")} onSubmit={handleSubmit} in={true} />
        </BaseSettingsModalScreen>
    );
});

export default ConfirmPinScreen;
