import styled from "@peersyst/react-native-styled";
import { Select, Typography } from "@peersyst/react-native-components";

export const SelectRoot = styled(Select)(({ theme }) => ({
    component: {
        display: {
            borderRadius: 45,
            height: 45,
            backgroundColor: theme.palette.lighterGray,
            borderWidth: 0,
            borderColor: "transparent",
            placeholderColor: theme.palette.black,
            ...theme.shadows[7],
        },
    },
}));

export const SelectHeader = styled(Typography)(() => ({
    padding: 20,
}));
