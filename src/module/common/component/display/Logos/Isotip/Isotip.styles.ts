import styled from "@peersyst/react-native-styled";
import { LogoIcon } from "icons";
import { getTextColor } from "utils/getTextColor";
import { IsotipAnimationContainerProps, IsotipRootProps, SizeIsotipRelationType } from "./Isotip.types";
import AnimationContainer from "module/common/component/display/AnimationContainer/AnimationContainer";

export const Isotip = styled(LogoIcon)<IsotipRootProps>(({ theme, size }) => {
    const color = getTextColor(theme);
    const { fontSize } = sizeRelations[size];
    return {
        color: color,
        fontSize: fontSize,
    };
});

export const sizeRelations: SizeIsotipRelationType = {
    xs: {
        fontSize: 37.72,
    },
    sm: {
        fontSize: 48,
    },
    md: {
        fontSize: 70,
    },
    lg: {
        fontSize: 103.61,
    },
    xl: {
        fontSize: 165.43,
    },
};

export const IsotipAnimatedContainer = styled(AnimationContainer)<IsotipAnimationContainerProps>(({ size }) => {
    const { fontSize } = sizeRelations[size];
    return {
        height: fontSize,
        width: fontSize,
    };
});
