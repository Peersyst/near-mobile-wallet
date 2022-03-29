import styled from "@peersyst/react-native-styled";
import { alpha } from "@peersyst/react-utils";
import { View } from "react-native";
import { Icon } from "react-native-components";
import Button from "../Button/Button";

interface CardButtonProps {
    position: "left" | "right";
}

export const CardButton = styled(Button, { size: "md", variant: "outlined" })<CardButtonProps>(({ theme, position }) => ({
    borderTopRightRadius: position === "left" ? 0 : undefined,
    borderBottomRightRadius: position === "left" ? 0 : undefined,
    borderTopLeftRadius: position === "right" ? 0 : undefined,
    borderBottomLeftRadius: position === "right" ? 0 : undefined,
    fontWeight: "bold",
    justifyContent: "space-between",
    width: 120,
    outlined: {
        borderWidth: 0,
        color: theme.palette.white,
        textTransform: "capitalize",
        paddingHorizontal: 0,
    },
    md: {
        fontSize: 14,
    },
    paddingHorizontal: 0,
    backgroundColor: alpha(theme.palette.white, 0.3),
    opacity: 0.9,
}));

export const Separator = styled(View)(({ theme }) => ({
    height: "100%",
    width: 2,
    backgroundColor: theme.palette.white,
    opacity: 0.5,
}));

export const CardButtonIcon = styled(Icon)(() => ({
    fontSize: 24,
}));
