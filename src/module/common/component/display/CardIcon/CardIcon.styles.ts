import { Col, Icon } from "@peersyst/react-native-components";
import styled, { styledWithAs } from "@peersyst/react-native-styled";
import { alpha } from "@peersyst/react-utils";
import { CardIconRootProps, InnerCardIconProps } from "./CardIcon.types";

export const CardIconRoot = styled(Col)<CardIconRootProps>(({ theme: { palette: p }, active }) => ({
    width: 44,
    height: 44,
    borderRadius: 44,
    backgroundColor: active ? alpha(p.blue, 0.12) : p.overlay["8%"],
}));

export const InnerCardIcon = styledWithAs(Icon)<InnerCardIconProps>(({ theme: { palette: p }, active, darkInactive }) => ({
    color: active ? p.blue : p.gray[darkInactive ? "600" : "300"],
}));
