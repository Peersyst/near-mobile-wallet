import { Image, View } from "react-native";
import styled from "@peersyst/react-native-styled";

export const LogoImage = styled(Image)(()=>({
    width:80,
    height:80,
    position: "absolute",
    top:-30,
}));

export const LogoLinkRoot = styled(View)(()=>({ 
    position: "relative",
    width: 80,
    height: "100%",
}));