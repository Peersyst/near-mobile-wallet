import styled from "@peersyst/react-native-styled";
import { Select, Typography } from "@peersyst/react-native-components";

export const SelectRoot = styled(Select)(({ theme, dimensions }) => ({
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
            disabled: {
                borderColor: theme.palette.overlay["12%"],
            },
            readonly: {
                borderColor: theme.palette.overlay["12%"],
            },
        },
        menu: {
            position: "absolute",
            bottom: 0,
            maxWidth: dimensions.width,
            width: dimensions.width,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        },
        item: {
            ...theme.typography.body2Regular,
            selected: {
                ...theme.typography.body2Strong,
                backgroundColor: theme.palette.primary,
            },
        },
    },
}));

export const SelectHeader = styled(Typography)(() => ({
    padding: 20,
}));
