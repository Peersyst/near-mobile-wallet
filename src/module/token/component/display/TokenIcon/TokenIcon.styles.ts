import styled from "@peersyst/react-native-styled";
import { Image } from "react-native";
import { TokenSize } from "./TokenIcon";

export const TokenIconRoot = styled(Image)<TokenSize>(({ width, height }) => ({
    width,
    height,
    borderRadius: 2000,
}));
