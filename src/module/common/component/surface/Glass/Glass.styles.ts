import styled from "@peersyst/react-native-styled";
import { View } from "react-native";

export const GlassRoot = styled(View)(({theme}) => ({
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    //TODO: add the correct blur effect
    backgroundColor: "#F9F9F9D8",
}));
