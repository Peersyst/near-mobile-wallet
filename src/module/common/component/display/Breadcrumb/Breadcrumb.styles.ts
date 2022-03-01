import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import { Row } from "../../base/layout/Row";
import { BreadcrumpProps } from "./Breadcrumb.types";

export const BreadcrumpRoot = styled(Row, { justifyContent: "space-between", alignItems: "center" })<Pick<BreadcrumpProps, "length">>(({ length }) => ({
    width: length <= 1 ? 0 : length * 63,
}));

export const BreadcrumpLine = styled(View)(({ theme }) => ({
    width: "100%",
    height: 3,
    backgroundColor: theme.palette.gray300,
    position: "absolute",
    zIndex: -2
}));


export const BreadcrumpActiveLine = styled(View)<BreadcrumpProps>(({ theme, numberOfActive, length }) => {
    const lineWidth = 100 / (length - 1) * (numberOfActive - 1);
    return {
        height: 3,
        backgroundColor: theme.palette.black,
        position: "absolute",
        zIndex: -1,
        width: `${lineWidth}%`,
    }
});
