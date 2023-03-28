import { Animated } from "react-native";
import { GradientPageProps } from "module/common/component/layout/GradientPage/GradientPage.types";
import { useDimensions } from "@react-native-community/hooks";
import { useEffect, useRef } from "react";
import { GradientPageGradient, GradientPageRoot } from "module/common/component/layout/GradientPage/GradientPage.styles";
import useWalletGradient from "module/wallet/hook/useWalletGradient";

const GradientPage = ({
    gradient,
    style: { backgroundColor: backgroundColorStyle, secondaryBackgroundColor: secondaryBackgroundColorStyle, ...style } = {},
    children,
    ...rest
}: GradientPageProps): JSX.Element => {
    const walletGradient = useWalletGradient();

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

    const backgroundColor = backgroundColorStyle || walletGradient[0];
    const secondaryBackgroundColor = secondaryBackgroundColorStyle || walletGradient[1];

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
