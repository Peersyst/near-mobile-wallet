import { CountdownButtonProps } from "module/common/component/input/CountdownButton/CountdownButton.types";
import { useEffect, useState } from "react";
import Button from "module/common/component/input/Button/Button";
import { Text } from "react-native";

const CountdownButton = ({
    seconds: secondsProp,
    disabled: disabledProp = false,
    children,
    style = {},
    variant = "primary",
    size = "lg",
    loading,
    onCountdownEnd,
    ...buttonProps
}: CountdownButtonProps): JSX.Element => {
    const [seconds, setSeconds] = useState(secondsProp);
    let timeout: NodeJS.Timeout;

    useEffect(() => {
        if (seconds > 0) {
            timeout = setTimeout(() => setSeconds((s) => s - 1), 1000);
        } else {
            onCountdownEnd?.();
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [seconds]);

    const countdown = seconds > 0;
    const disabled = countdown || disabledProp;

    return (
        <Button
            loading={countdown || loading}
            loadingElement={loading ? undefined : <Text style={{ textTransform: "none" }}>{`${seconds}s`}</Text>}
            disabled={disabled}
            style={style}
            variant={variant}
            size={size}
            {...buttonProps}
        >
            {children}
        </Button>
    );
};

export default CountdownButton;
