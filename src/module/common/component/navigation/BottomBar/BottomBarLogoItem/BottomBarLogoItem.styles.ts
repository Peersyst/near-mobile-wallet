import { Image, Pressable, View } from "react-native";
import styled from "@peersyst/react-native-styled";

export const LogoImage = styled(Image)(()=>({
    width: "100%",
    height: "100%",
}));

export const PressableImageRoot = styled(Pressable)(()=> ({
    width:80,
    height:80,
    position: "absolute",
    zIndex:2,
    top:-30,
}))

export const LogoItemRoot = styled(View)(()=>({ 
    position: "relative",
    width: 80,
    height: "100%",
}));
