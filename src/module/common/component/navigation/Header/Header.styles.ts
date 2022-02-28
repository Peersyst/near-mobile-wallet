import styled from "@peersyst/react-native-styled";
import { Paper } from "react-native-components";

export const HeaderRoot = styled(Paper)(({ theme }) => {
    return {
        paddingBottom: 16,
        zIndex: theme.zIndex.header,
    };
});
