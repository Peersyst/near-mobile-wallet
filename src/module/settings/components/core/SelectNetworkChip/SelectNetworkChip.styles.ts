import styled from "@peersyst/react-native-styled";
import Chip from "module/common/component/display/Chip/Chip";
import { Chains } from "module/sdk/NearSdkService";
import { NetworkType } from "module/settings/state/SettingsState";
import { alpha } from "@peersyst/react-utils";

export const NetworkChip = styled(Chip)<{ type: NetworkType }>(({ theme, type }) => ({
    color: type === Chains.MAINNET ? theme.palette.status.success : theme.palette.status.info,
    backgroundColor: type === Chains.MAINNET ? alpha(theme.palette.status.success, 0.12) : alpha(theme.palette.status.info, 0.12),
}));
