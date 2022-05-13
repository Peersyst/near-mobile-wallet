import { translate } from "locale";
import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useState } from "react";
import { Animated, createBackdrop, ExposedBackdropProps } from "react-native-components";
import BaseSettingsModalScreen from "../../layout/BaseSettingsModal/BaseSettingsModal";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import { useControlled } from "@peersyst/react-hooks";

const AnimatedNumericPad = Animated.createAnimatedComponent.fade(NumericPad, { duration: 200, appear: true });

interface ConfirmPinScreenProps
    extends Omit<ExposedBackdropProps, "animationIn" | "animationOut" | "animationInTiming" | "animationOutTiming"> {
    onPinConfirmed: () => any;
    onConfirmedExited?: () => any;
}

const ConfirmPinModal = createBackdrop(
    ({ open: openProp, onOpen, onClose, onPinConfirmed, onConfirmedExited, onExited, ...rest }: ConfirmPinScreenProps) => {
        const [error, setError] = useState<boolean>(false);
        const [open, setOpen] = useControlled(false, openProp, openProp ? onClose : onOpen);
        const [success, setSuccess] = useState(false);

        const handleSubmit = async (pin: string) => {
            const storedPin = await WalletStorage.getPin();
            if (pin === storedPin) {
                onPinConfirmed();
                setSuccess(true);
                setOpen(false);
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
            <BaseSettingsModalScreen open={open} title={translate("confirm_your_pin")} onExited={handleExited} {...rest}>
                <AnimatedNumericPad error={error} placeholder={translate("enter_your_pin")} onSubmit={handleSubmit} in={true} />
            </BaseSettingsModalScreen>
        );
    },
);

export default ConfirmPinModal;
