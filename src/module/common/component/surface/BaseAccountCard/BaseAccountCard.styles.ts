import styled from "@peersyst/react-native-styled";
import { Dimensions } from "react-native";
import Card from "../Card/Card";

export const BaseAccountCardRoot = styled(Card)(() => {
    const width = Dimensions.get("window").width;
    return {
        width: width - 40,
        height: 200,
        marginHorizontal: 20,
        marginTop: 5,
        marginBottom: 12,
    };
});
