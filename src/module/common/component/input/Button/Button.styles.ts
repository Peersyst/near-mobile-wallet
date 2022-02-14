import { Button } from "react-native-components";
import { ButtonRootProps } from "./Button.types";
import styled from "@peersyst/react-native-styled";

export const ButtonRoot = styled(Button, { variant: "outlined", size: "lg" })<ButtonRootProps>(
    ({ theme, type }) => ({
        width: "86%",
        marginLeft: "7%",
        borderRadius: 42,
        textTransform: "uppercase",
        fontWeight: "bold",
        outlined: {
            color: type === "dark" ? theme.palette.black : theme.palette.white,
            borderWidth: type === "dark" ? 5 : 3,
            borderColor: type === "dark" ? theme.palette.black : theme.palette.white,
        },
        lg: {
            height: 70,
            fontSize: 22,
            paddingHorizontal: 26
        },
        // shadowOffset: {
        //     width: type === "dark" ? 0 : undefined,
        //     height: type === "dark" ? 3 : undefined,
        // },
        // shadowOpacity: type === "dark" ? 0 : undefined,
        // shadowRadius: type === "dark" ? 24 : undefined,
        // elevation: type === "dark" ? 10 : undefined,
    }),
);
