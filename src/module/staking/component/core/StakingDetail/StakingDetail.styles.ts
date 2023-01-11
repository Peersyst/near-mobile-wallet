import styled from "@peersyst/react-native-styled";
import { Paper, Row } from "@peersyst/react-native-components";
import { NearIcon } from "icons";
import { alpha } from "@peersyst/react-utils";

export const StakingDetailRoot = styled(Row)(() => ({
    paddingVertical: 16,
    paddingHorizontal: 20,
}));

export const IconCircleWrapper = styled(Paper, { elevation: 0 })(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 44,
    height: 44,
    borderRadius: 100,
    backgroundColor: alpha(theme.palette.primary, 0.12),
}));

export const CircleNearIcon = styled(NearIcon)(({ theme }) => ({
    width: 22,
    height: 22,
    color: theme.palette.primary,
}));
