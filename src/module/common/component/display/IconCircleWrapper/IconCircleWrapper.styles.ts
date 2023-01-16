import styled from "@peersyst/react-native-styled";
import { Paper } from "@peersyst/react-native-components";

export interface IconCircleWrapperProps {
    size: number;
    backgroundColor: string;
}

export const IconCircleWrapper = styled(Paper, { elevation: 0 })<IconCircleWrapperProps>(({ size, backgroundColor }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: size,
    height: size,
    borderRadius: 100,
    backgroundColor: backgroundColor,
}));
