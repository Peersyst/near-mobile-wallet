import styled from "@peersyst/react-native-styled";
import { SuccessIcon } from "module/common/icons/SuccessIcon";

export const OrderIconSuccess = styled(SuccessIcon)(({ theme }) => ({
    color: theme.palette.status.success,
    fontSize: 65,
}));
