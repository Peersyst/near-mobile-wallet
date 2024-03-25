import { Typography } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { DeviceSize } from "module/common/hook/useDeviceSize";

export const TypographyAdvise = styled(Typography)<{ size: DeviceSize }>(({ size }) => ({
    fontSize: size === DeviceSize.SMALL ? 11 : 14,
}));
