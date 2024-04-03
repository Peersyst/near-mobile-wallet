import styled from "@peersyst/react-native-styled";
import { Col } from "@peersyst/react-native-components";
import { BaseMainVariant } from "./BaseMainScreen.stypes";

export const BaseMainScreenRoot = styled(Col, { flex: 1 })<{ variant: BaseMainVariant }>(({ theme, variant }) => ({
    backgroundColor: variant === BaseMainVariant.DEFAULT ? theme.palette.background : theme.palette.overlay["4%"],
}));
