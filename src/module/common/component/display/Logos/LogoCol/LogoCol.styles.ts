import styled from "@peersyst/react-native-styled";
import { LogoColIcon as Icon } from "module/common/icons/LogoColIcon";
import { View } from "react-native";
import { getTextColor } from "utils/getTextColor";
import { LogoColProps, LogoColRootProps } from "./LogoCol";

export const LogoColIcon = styled(Icon)<LogoColProps>(({ theme }) => {
    const color = getTextColor(theme);
    return {
        color: color,
    };
});

export const LogoColRoot = styled(View)<LogoColRootProps>(({ size = "100%", dimensions: { width } }) => {
    return {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        maxHeight: width * 0.5,
        minHeight: 120,
    };
});
