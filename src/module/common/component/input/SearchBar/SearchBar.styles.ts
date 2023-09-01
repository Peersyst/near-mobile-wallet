import styled from "@peersyst/react-native-styled";
import { SearchIcon } from "icons";
import TextField from "../TextField/TextField";
import { View } from "react-native";

export const SearchBarRoot = styled(TextField, { size: "md" })(({ theme }) => {
    return {
        component: {
            backgroundColor: theme.palette.overlay["4%"],
            borderRadius: theme.borderRadiusMd,
            borderWidth: 0,
            input: {
                placeholderColor: theme.palette.overlay["20%"],
            },
        },
    };
});

export const SearchBarIcon = styled(SearchIcon)(({ theme }) => ({
    color: theme.palette.overlay["20%"],
    fontSize: 20,
}));

// Needed to block color prop propagation from TextField
export const SearchBarSuffix = styled(View)(() => ({
    width: 20,
    height: 20,
}));
