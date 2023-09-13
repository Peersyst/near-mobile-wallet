import { SwipeButton } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { ChevronRightIcon } from "icons";

export const SwipeButtonRoot = styled(SwipeButton)(({ theme }) => ({
    height: 52,
    borderRadius: 9999,

    ...theme.typography.body2Strong,

    color: theme.palette.white,
    backgroundColor: theme.palette.primary,
    thumb: {
        backgroundColor: theme.palette.white,
        color: theme.palette.black,
    },
    track: {
        padding: 6,
    },
}));

export const SwipeButtonThumbIcon = styled(ChevronRightIcon)(() => ({
    fontSize: 24,
}));
