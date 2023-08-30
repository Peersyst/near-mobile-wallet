import styled from "@peersyst/react-native-styled";
import AnimatedActionable from "module/common/component/feedback/AnimatedActionable/AnimatedActionable";

export const DisconnectableDAppRoot = styled(AnimatedActionable)(({ theme }) => ({
    rootStyle: {
        backgroundColor: theme.palette.status.error,
        borderRadius: theme.borderRadiusMd,
    },
    swipedRightActionStyle: {
        color: theme.palette.white,
    },
}));
