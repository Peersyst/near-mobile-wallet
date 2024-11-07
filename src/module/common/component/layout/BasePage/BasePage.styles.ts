import styled from "@peersyst/react-native-styled";
import { View } from "react-native";

export const BasePageRoot = styled(View)(({ theme }) => ({
    flex: 1,
    backgroundColor: theme.palette.background,
}));

export const BasePageContent = styled(View)(() => {
    return {
        flex: 1,
    };
});
