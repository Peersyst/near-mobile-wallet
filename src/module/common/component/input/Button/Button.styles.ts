import { Button } from "react-native-components";
import { ButtonRootProps } from "./Button.types";
import styled from "@peersyst/react-native-styled";

export const ButtonRoot = styled(Button, { variant: "outlined", size: "lg", fullWidth: true })<ButtonRootProps>(
    ({ theme, type, size }) => ({
        outlined: {
            color: theme.palette.black,
            borderWidth: 4,
            borderColor: theme.palette.black,
        },
    }),
);
