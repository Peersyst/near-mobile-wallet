import styled from "@peersyst/react-native-styled";
import { Row } from "react-native-components";

export const CKBAmountInputContainer = styled(Row)(({ dimensions: { height } }) => ({
    marginHorizontal: 20,
    marginTop: height < 680 ? "3%" : "15%",
}));
