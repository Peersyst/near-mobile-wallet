import styled from "@peersyst/react-native-styled";
import { View, Text } from "react-native";
import { Icon } from "@peersyst/react-native-components";

export const PadItemRoot = styled(View)(({ theme, dimensions }) => {
    const size = Math.min(56, dimensions.height * 0.075);

    return {
        height: size,
        width: size,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.overlay["12%"],
        borderRadius: 9999,
        overflow: "hidden",
    };
});

export const Item = styled(Text)(({ theme }) => ({
    ...theme.typography.h3Strong,
    color: theme.palette.text,
}));

export const ItemIcon = styled(Icon)(({ theme }) => ({
    color: theme.palette.text,
    fontSize: 36,
}));
