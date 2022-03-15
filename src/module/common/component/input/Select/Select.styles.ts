import styled from "@peersyst/react-native-styled";
import { Select, Typography } from "react-native-components";

export const SelectRoot = styled(Select)(({ theme }) => ({
    display: {
        borderRadius: 45,
        height: 45,
        backgroundColor: theme.palette.lighterGray,
        borderColor: "transparent",
        placeholderColor: theme.palette.darkGray,
        ...theme.shadows[7],
    },
}));

export const SelectHeader = styled(Typography)(() => ({
    padding: 20,
}));
