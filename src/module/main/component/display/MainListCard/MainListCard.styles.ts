import { Row } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { MainListCardProps } from "./MainListCard";

export const MainListCardRoot = styled(Row)<MainListCardProps>(({ last }) => ({
    marginBottom: last ? 25 : 0,
}));
