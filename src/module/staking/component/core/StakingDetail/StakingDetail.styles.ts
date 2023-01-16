import styled from "@peersyst/react-native-styled";
import { Row } from "@peersyst/react-native-components";
import { NearIcon } from "icons";

export const StakingDetailRoot = styled(Row)(() => ({
    paddingVertical: 16,
    paddingHorizontal: 20,
    minHeight: 90,
    maxHeight: 90,
}));

export const CircleNearIcon = styled(NearIcon)(({ theme }) => ({
    width: 22,
    height: 22,
    color: theme.palette.primary,
}));
