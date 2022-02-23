import styled from "@peersyst/react-native-styled";
import { SafeAreaView } from "react-native";

export const DarkPageRoot = styled(SafeAreaView)(({theme})=>({
    backgroundColor: theme.palette.black,
    width:"100%",
    height:"100%"
}));
