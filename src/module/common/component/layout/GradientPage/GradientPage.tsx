import { Animated } from "react-native";
import { GradientPageProps } from "module/common/component/layout/GradientPage/GradientPage.types";
import { useTheme } from "@peersyst/react-native-styled";
import { useDimensions } from "@react-native-community/hooks";
import { useEffect, useRef } from "react";
import { GradientPageGradient, GradientPageRoot } from "module/common/component/layout/GradientPage/GradientPage.styles";

const GradientPage = ({
    gradient,
    style: { backgroundColor: backgroundColorStyle, secondaryBackgroundColor: secondaryBackgroundColorStyle, ...style } = {},
    children,
    ...rest
}: GradientPageProps): JSX.Element => {
    const { palette } = useTheme();

    const {
        screen: { width },
    } = useDimensions();

    const gradientAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(gradientAnim, {
            toValue: gradient ? 0 : width,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [gradient]);

    const backgroundColor = backgroundColorStyle || palette.gradient.blueTurquoise[0];
    const secondaryBackgroundColor = secondaryBackgroundColorStyle || palette.gradient.blueTurquoise[1];

    return (
        <GradientPageRoot style={{ backgroundColor, ...style }} {...rest}>
            {children}
            <GradientPageGradient
                colors={[backgroundColor, secondaryBackgroundColor]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{
                    transform: [{ translateX: gradientAnim }],
                }}
            />
        </GradientPageRoot>
    );
};

export default GradientPage;
