import styled from "@peersyst/react-native-styled";
import { Select } from "react-native-components";

export const SelectRoot = styled(Select)(({ theme }) => ({
    display: {
        borderRadius: 45,
        height: 45,
        backgroundColor: theme.palette.lighterGray,
        borderColor: "transparent",
        ...theme.shadows[7],
    },
}));
