import styled from "@peersyst/react-native-styled";
import { LogoColIcon } from "module/common/icons/LogoColIcon";
import { getTextColor } from "utils/getTextColor";
import { LogoColProps } from "./LogoCol";

export const LogoColRoot = styled(LogoColIcon)<LogoColProps>(({ theme }) => {
    const color = getTextColor(theme);
    return {
        color: color,
    };
});