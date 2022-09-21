import styled from "@peersyst/react-native-styled";
import { View } from "react-native";

export const CKBAmountInputContainer = styled(View)(({ dimensions: { height } }) => ({
    marginHorizontal: 20,
    marginTop: height < 680 ? "3%" : "15%",
}));
