import styled from "@peersyst/react-native-styled";
import { View } from "react-native";

export const GlassRoot = styled(View)(() => ({
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: "15 15 0 15",
    //TODO: add the correct blur effect
    backgroundColor: "#F9F9F9D8",
}));
