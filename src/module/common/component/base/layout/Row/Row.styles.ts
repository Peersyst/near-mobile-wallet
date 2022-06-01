import styled from "@peersyst/react-native-styled";
import { View } from "react-native";

export interface RowRootProps {
    wrap: boolean;
}

export const RowRoot = styled(View)<RowRootProps>(({ wrap }) => ({ flexDirection: "row", flexWrap: wrap ? "wrap" : "nowrap" }));
