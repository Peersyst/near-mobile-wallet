import styled from "@peersyst/react-native-styled";
import { Animated } from "react-native";
import { PaginationDotProps } from "module/common/component/display/DottedPagination/DottedPagination.types";

export const PaginationDot = styled(Animated.View)<PaginationDotProps>(({ theme, active }) => ({
    backgroundColor: active ? theme.palette.primary : theme.palette.disabled,
    height: 10,
    width: 10,
    borderRadius: 5,
}));
