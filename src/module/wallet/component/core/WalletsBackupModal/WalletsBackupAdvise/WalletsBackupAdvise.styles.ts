import { IconButton } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { DeviceSize } from "module/common/hook/useDeviceSize";

export const WalletsBackupAdviseIcon = styled(IconButton)<{ size: DeviceSize }>(({ theme, size }) => ({
    color: theme.palette.primary,
    fontSize: size === DeviceSize.SMALL ? 30 : 50,
}));
