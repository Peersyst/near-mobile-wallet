import styled from "@peersyst/react-native-styled";
import { MainListCardRoot } from "module/main/component/display/MainListCard/MainListCard.styles";
import { MainListCardProps } from "module/main/component/display/MainListCard/MainListCard";

export const TransactionCardRoot = styled(MainListCardRoot, { gap: "4%", alignItems: "center" })<MainListCardProps>(({ last }) => ({
    paddingVertical: 14,
    marginBottom: last ? 25 : 0,
}));
