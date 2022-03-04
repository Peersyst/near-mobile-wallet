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
    backgroundColor: theme.palette.grayBackground,
}));
