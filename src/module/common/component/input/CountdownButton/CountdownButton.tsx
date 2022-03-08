import { CountdownButtonProps } from "module/common/component/input/CountdownButton/CountdownButton.types";
import { useEffect, useState } from "react";
import Button from "module/common/component/input/Button/Button";
import { Text } from "react-native";
import useButtonStyles from "module/common/component/base/input/Button/hooks/useButtonStyles";

const CountdownButton = ({
    seconds: secondsProp,
    disabled: disabledProp = false,
    children,
    style = {},
    variant = "contained",
    size = "lg",
    loading,
    ...buttonProps
}: CountdownButtonProps): JSX.Element => {
    const [seconds, setSeconds] = useState(secondsProp);

    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds((s) => s - 1), 1000);
        }
    }, [seconds]);

    const countdown = seconds > 0;
    const disabled = countdown || disabledProp;
    const { textStyle } = useButtonStyles(style, variant, size, disabled, false);

    return (
        <Button
            loading={countdown || loading}
            loadingElement={loading ? undefined : <Text style={{ ...textStyle, textTransform: "none" }}>{`... ${seconds}s`}</Text>}
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
