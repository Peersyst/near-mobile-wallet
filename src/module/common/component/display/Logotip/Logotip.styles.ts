import styled from "@peersyst/react-native-styled";
import { getTextColor } from "utils/getTextColor";
import { LogotipProps, LogotipSizeRelationsType } from "./Logotip";
import { IsotipIcon } from "../IsotipIcon/IsotipIcon";

export const LogotipSizeRelations:LogotipSizeRelationsType  = {
    sm: {
        width: 103.62,
        height: 16.27,
    },
    md: {
        width: 133.62,
        height: 20.99
    },
    lg: {
        width: 165.42,
        height: 25.99
    }
}

export const Logotip = styled(IsotipIcon)<LogotipProps>(({ theme, appearance, size }) => {
    const color = getTextColor(theme);
    const { width, height } = LogotipSizeRelations[size];
    return {
        ...color[appearance],
        width,
        height,
    };
});
