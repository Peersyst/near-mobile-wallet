import { TypographyStyle } from "@peersyst/react-native-components";
import { useTheme } from "@peersyst/react-native-styled";
import { SwipedActionProps } from "module/common/component/feedback/AnimatedActionable/AnimatedActionable.types";
import { ViewStyle } from "react-native";

export default function useDisconnectableDAppProps() {
    const { palette, borderRadiusMd } = useTheme();

    const swipeActionStyles: ViewStyle = {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    };

    const labelStyles: TypographyStyle = {
        color: palette.white,
    };

    const swipeActionProps: SwipedActionProps = {
        style: swipeActionStyles,
        labelProps: {
            variant: "body3Strong",
            style: labelStyles,
        },
    };

    const actionableProps = {
        style: {
            backgroundColor: palette.status.error,
            borderRadius: borderRadiusMd,
        },
    };

    return {
        actionableProps,
        swipeActionProps,
    };
}
