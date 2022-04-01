import styled from "@peersyst/react-native-styled";
import { IconButton } from "react-native-components";
import Card from "module/common/component/surface/Card/Card";

export const BackIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.darkGray,
    fontSize: 26,
}));

export const AdviseCardRoot = styled(Card)(() => {
    return {
        flex: 1,
        marginTop: 4,
        minHeight: 300,
    };
});
