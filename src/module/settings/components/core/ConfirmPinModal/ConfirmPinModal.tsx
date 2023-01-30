import { WalletStorage } from "module/wallet/WalletStorage";
import { useState } from "react";
import { Animated, createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import BaseSettingsModalScreen from "../../layout/BaseSettingsModal/BaseSettingsModal";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import { useTranslate } from "module/common/hook/useTranslate";
import BiometricNumericPad from "module/common/component/input/BiometricNumericPad/BiometricNumericPad";

const AnimatedBiometricsNumericPad = Animated.createAnimatedComponent.fade(BiometricNumericPad, { duration: 200, appear: true });

export interface ConfirmPinScreenProps
    extends Omit<ExposedBackdropProps, "animationIn" | "animationOut" | "animationInTiming" | "animationOutTiming"> {
    onPinConfirmed: () => any;
    onConfirmedExited?: () => any;
}

const ConfirmPinModal = createBackdrop(
    ({ open: openProp, onPinConfirmed, onConfirmedExited, onExited, ...rest }: ConfirmPinScreenProps) => {
        const translate = useTranslate();

        const [error, setError] = useState<boolean>(false);
        const [open, setOpen] = useState(true);
        const [success, setSuccess] = useState(false);

        const handleSuccess = () => {
            onPinConfirmed();
            setSuccess(true);
            setOpen(false);
        };

        const handleSubmit = async (pin: string) => {
            const storedPin = await WalletStorage.getPin();
            if (pin === storedPin) {
                handleSuccess();
            } else {
                setError(true);
                notificationAsync(NotificationFeedbackType.Error);
            }
        };

        const handleExited = () => {
            if (success && onConfirmedExited) onConfirmedExited();
            onExited?.();
        };

        return (
            <BaseSettingsModalScreen
                open={open && openProp}
                onClose={() => setOpen(false)}
                title={translate("confirm_your_pin")}
                onExited={handleExited}
                {...rest}
            >
                <AnimatedBiometricsNumericPad
                    error={error}
                    placeholder={translate("enter_your_pin")}
                    onSubmit={handleSubmit}
                    onBiometricsSuccess={handleSuccess}
                    in={true}
                />
            </BaseSettingsModalScreen>
        );
    },
);

export default ConfirmPinModal;
