import { translate } from "locale";
import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useState } from "react";
import { Animated, createBackdrop, ExposedBackdropProps, useToast } from "react-native-components";
import BaseSettingsModalScreen from "../../layout/BaseSettingsModal/BaseSettingsModal";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";

const AnimatedNumericPad = Animated.createAnimatedComponent.fade(NumericPad, { duration: 200, appear: true });

interface ConfirmPinScreenProps
    extends Omit<ExposedBackdropProps, "animationIn" | "animationOut" | "animationInTiming" | "animationOutTiming"> {
    onPinConfirmed: any;
}

const ConfirmPinModal = createBackdrop(({ onPinConfirmed, ...rest }: ConfirmPinScreenProps) => {
    const [error, setError] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>();
    const { showToast } = useToast();
    const handleSubmit = async (pin: string) => {
        try {
            const storedPin = await WalletStorage.getPin();
            if (pin === storedPin) {
                onPinConfirmed();
                setOpen(false);
            } else {
                setError(true);
                notificationAsync(NotificationFeedbackType.Error);
            }
        } catch (e) {
            showToast(translate("somethingWentWrong"));
        }
    };
    return (
        <BaseSettingsModalScreen open={open} title={translate("confirm_your_pin")} {...rest}>
            <AnimatedNumericPad error={error} placeholder={translate("enter_your_pin")} onSubmit={handleSubmit} in={true} />
        </BaseSettingsModalScreen>
    );
});

export default ConfirmPinModal;
