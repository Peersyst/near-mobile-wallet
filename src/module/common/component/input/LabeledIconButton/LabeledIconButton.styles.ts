import { Button } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { ButtonProps } from "../Button/Button.types";

export const WalletButton = styled(Button)<ButtonProps>(({ theme }) => {
    return {
        borderRadius: 100,
        height: 48,
        width: 80,
        paddingHorizontal: 18,
        paddingVertical: 12,

        primary: {
            backgroundColor: theme.palette.overlay["8%"],
            color: "#FFFFFF",
        },
        secondary: {
            backgroundColor: "#FFFFFF",
            color: "#000000",
        },
    };
});
