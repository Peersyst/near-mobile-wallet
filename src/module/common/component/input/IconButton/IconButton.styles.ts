import { IconButton } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { IconButtonProps } from "./IconButton.types";

export const IconButtonRoot = styled(IconButton)<IconButtonProps>(({ theme }) => {
    return {
        height: 48,
        width: 80,
        paddingHorizontal: 18,
        paddingVertical: 12,

        primary: {
            backgroundColor: theme.palette.overlay["8%"],
            color: "#FFFFFF",
        },
        transparent: {
            backgroundColor: "#FFFFFF",
            color: "#000000",
        },
    };
});
