import { translate } from "locale";
import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useState } from "react";
import { Animated } from "react-native-components";
import BaseSettingsModalScreen from "../components/layout/BaseSettingsModal/BaseSettingsModal";

const AnimatedNumericPad = Animated.createAnimatedComponent.fade(NumericPad, { duration: 200, appear: true });

const ConfirmPinScreen = (): JSX.Element => {
  
    const [error, setError] = useState(false);
    const handleSubmit = async (pin: string) => {
        const storedPin = await WalletStorage.getPin();
        if (pin === storedPin) {
            //Do something
        } else {
            setError(true);
        }
    };
    return (
        <BaseSettingsModalScreen title={translate("confirm_your_pin")} back>
            <AnimatedNumericPad error={error} placeholder={translate("enter_your_pin")} onSubmit={handleSubmit} in={true} />
        </BaseSettingsModalScreen>
    );
};

export default ConfirmPinScreen;
