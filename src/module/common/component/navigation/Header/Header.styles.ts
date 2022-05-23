import styled from "@peersyst/react-native-styled";
import { Paper } from "react-native-components";

export const HEADER_PADDING_BOTTOM = 4;

export const HeaderRoot = styled(Paper)(({ theme }) => {
    return {
        paddingBottom: HEADER_PADDING_BOTTOM,
        zIndex: theme.zIndex.header,
        backgroundColor: theme.palette.appbar,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
    };
});
