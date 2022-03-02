import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import { Row } from "../../base/layout/Row";
import { BreadcrumbLineProps, BreadcrumbProps } from "./Breadcrumb.types";

export const BreadcrumbRoot = styled(Row, { justifyContent: "space-between", alignItems: "center" })<Pick<BreadcrumbProps, "length">>(
    ({ length }) => ({
        width: length <= 1 ? 0 : length * 63,
    }),
);

export const BreadcrumbLine = styled(View)<BreadcrumbLineProps>(({ theme, length, active }) => {
    const lineWidth = 68 / (length - 1);

    return {
        width: `${lineWidth}%`,
        height: 3,
        backgroundColor: active ? theme.palette.primary : theme.palette.disabled,
    };
});
