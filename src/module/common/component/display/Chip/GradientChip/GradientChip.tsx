import { GradientChipBackgroundGradiend, GradientChipRoot } from "./GradientChip.styles";
import { useTheme } from "@peersyst/react-native-components";
import { useEffect, useMemo, useRef } from "react";
import useThemeMode from "module/common/hook/useThemeMode";
import useWalletGradient from "module/wallet/hook/useWalletGradient";
import { Animated, ViewStyle } from "react-native";
import { ChipRoot, ChipText } from "../Chip.styles";
import { ChipProps } from "../Chip.types";
import { extractTextStyles } from "utils/extractTextStyles";

export interface GradientChipProps extends Omit<ChipProps, "variant"> {
    style?: ViewStyle;
}

const GradientChip = ({ label, size, style, fullWidth, ...rest }: GradientChipProps): JSX.Element => {
    const mode = useThemeMode();
    const { palette } = useTheme();
    const textColor = mode === "light" ? palette.background : palette.text;
    const [textStyles, rootStyles] = useMemo(() => extractTextStyles({ ...style }), [style]);
    const walletGradient = useWalletGradient();

    const gradientAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(gradientAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, []);

    const backgroundColor = walletGradient[0];
    const secondaryBackgroundColor = walletGradient[1];

    return (
        <GradientChipRoot {...rest} style={rootStyles}>
            <ChipRoot size={size} fullWidth={fullWidth}>
                <ChipText size={size} style={{ color: textColor, ...textStyles }}>
                    {label}
                </ChipText>
            </ChipRoot>
            <GradientChipBackgroundGradiend
                colors={[backgroundColor, secondaryBackgroundColor]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{
                    transform: [{ translateX: gradientAnim }],
                }}
            />
        </GradientChipRoot>
    );
};

export default GradientChip;
