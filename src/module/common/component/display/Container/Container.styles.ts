import styled from "@peersyst/react-native-styled";
import { View } from "react-native";

export const ContainerRoot = styled(View)(({ theme }) => ({
    borderStyle: "solid",
    borderRadius: theme.borderRadiusSm,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderColor: theme.palette.overlay["8%"],
}));
