import styled from "@peersyst/react-native-styled";
import { View } from "react-native";

export const HeaderRoot = styled(View)(()=>({ 
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15
}))