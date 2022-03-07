import styled from "@peersyst/react-native-styled";
import { useWindowDimensions } from "react-native";
import Card from "../../surface/Card/Card";

export const AccountCardRoot = styled(Card)(({ theme }) => {
    const { width } = useWindowDimensions();
    return {
        width: width * 0.9,
        height: 200,
        marginHorizontal: width * 0.05,
        marginTop: 5,
        marginBottom: 12
    }
})