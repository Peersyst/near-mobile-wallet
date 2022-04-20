import styled from "@peersyst/react-native-styled";
import { Text } from "react-native";
import { Modal } from "../Modal";
import { DialogOptionProps } from "module/common/component/base";

export const DialogRoot = styled(Modal)(() => ({
    width: "90%",
    maxWidth: "90%",
}));

export const DialogTitle = styled(Text)(({ theme }) => ({
    color: theme.palette.text,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
}));

export const DialogMessage = styled(Text)(({ theme }) => ({
    color: theme.palette.text,
    fontSize: 14,
}));

export const DialogOption = styled(Text)<DialogOptionProps>(({ theme, type = "default" }) => {
    const color =
        type === "default" ? theme.palette.primary : type === "destructive" ? theme.palette.status.error : theme.palette.status.success;
    return {
        color,
        fontWeight: "bold",
        fontSize: 16,
    };
});
