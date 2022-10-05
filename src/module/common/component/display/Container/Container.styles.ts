import { ContainerProps } from "module/common/component/display/Container/Container.types";
import styled from "@peersyst/react-native-styled";
import { View } from "react-native";

export const ContainerRoot = styled(View)<ContainerProps>(({ theme, fullWidth }) => ({
    borderStyle: "solid",
    borderRadius: theme.borderRadius,
    borderWidth: 2,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderColor: theme.palette.gray[0],
    alignSelf: fullWidth ? undefined : "stretch",
}));
