import styled from "@peersyst/react-native-styled";
import { Select, Typography } from "@peersyst/react-native-components";

export const SelectRoot = styled(Select)(({ theme }) => ({
    component: {
        display: {
            borderRadius: theme.borderRadiusSm,
            height: 60,
            backgroundColor: theme.palette.background,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: theme.palette.overlay["12%"],
            placeholderColor: theme.palette.overlay["12%"],
            paddingHorizontal: 20,
            icon: {
                color: theme.palette.gray[300],
                fontSize: 20,
            },
        },
    },
}));

export const SelectHeader = styled(Typography)(() => ({
    padding: 20,
}));
