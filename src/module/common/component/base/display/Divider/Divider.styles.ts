import { DividerRootProps, DividerWidths, DividerWithChildrenProps } from "./Divider.types";
import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import { Row } from "../../layout/Row";

const dividerWidths: Record<DividerWidths, string> = {
    sm: "25%",
    md: "50%",
    lg: "75%",
    "full-width": "100%",
};

export const DividerRoot = styled(View)<DividerRootProps>(({ height, width, color, theme }) => ({
    height,
    backgroundColor: color || theme.palette.text,
    width: dividerWidths[width],
}));

export const DividerWithChildren = styled(Row, {
    gap: "6%",
    justifyContent: "center",
    alignItems: "center",
})<DividerWithChildrenProps>(({ width }) => ({
    width: dividerWidths[width],
    overflow: "hidden",
}));
