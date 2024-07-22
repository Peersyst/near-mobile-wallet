import styled from "@peersyst/react-native-styled";
import { ScrollView } from "react-native";

export const SecondaryScreenScrollView = styled(ScrollView, { contentContainerStyle: { padding: 0, paddingBottom: 20 } })(({ theme }) => ({
    backgroundColor: theme.palette.gray[100],
}));
