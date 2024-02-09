import { useState } from "react";
import { Animated } from "@peersyst/react-native-components";
import NumericPad from "../NumericPad/NumericPad";
import { NumericPadProps } from "../NumericPad/NumericPad.types";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import useTranslate from "module/common/hook/useTranslate";

export interface RepeatingPinProps extends Omit<NumericPadProps, "onSubmit" | "error"> {
    onSuccess: NumericPadProps["onSubmit"];
}

const AnimatedNumericPad = Animated.createAnimatedComponent.fade(NumericPad, { duration: 200 });

const RepeatNumericPad = ({ onSuccess, onCancel, placeholder, style, belowLogo }: RepeatingPinProps) => {
    const [pin, setPin] = useState<string>();
    const [error, setError] = useState(false);
    const translate = useTranslate();
    const handlePinSubmit = (p: string) => {
        setPin(p);
    };

    const handleRepeatPinSubmit = (p: string) => {
        if (p === pin) {
            onSuccess(p);
        } else {
            setError(true);
            setPin(undefined);
            notificationAsync(NotificationFeedbackType.Error);
        }
    };

    return pin ? (
        <AnimatedNumericPad
            belowLogo={belowLogo}
            key="repeat_pin"
            in
            onSubmit={handleRepeatPinSubmit}
            onCancel={onCancel}
            placeholder={translate("repeat_pin")}
            style={style}
        />
    ) : (
        <AnimatedNumericPad
            belowLogo={belowLogo}
            key="set_pin"
            in
            appear
            onSubmit={handlePinSubmit}
            onCancel={onCancel}
            placeholder={error ? translate("pins_did_not_match") : placeholder}
            style={style}
        />
    );
};

export default RepeatNumericPad;
