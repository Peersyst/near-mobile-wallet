import styled from "@peersyst/react-native-styled";
import Typography from "module/common/component/display/Typography/Typography";
import { Row } from "@peersyst/react-native-components";
import { ValidatorStatusTagProps } from "module/staking/component/core/ValidatorInformation/ValidatorInformation.types";

export const ValidatorRoot = styled(Row)(() => ({
    flex: 1,
    alignItems: "center",
    minHeight: 76,
    maxHeight: 76,
    width: "100%",
}));

export const ValidatorStatusTag = styled(Typography, { variant: "body4Strong" })<ValidatorStatusTagProps>(({ theme, active }) => ({
    color: active ? theme.palette.blue : theme.palette.red,
}));
