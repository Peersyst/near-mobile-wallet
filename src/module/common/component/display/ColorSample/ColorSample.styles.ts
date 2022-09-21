import styled from "@peersyst/react-native-styled";
import { Paper } from "@peersyst/react-native-components";
import { CheckIcon } from "icons";

export interface ColorSampleRootProps {
    color: string;
}

export const ColorSampleRoot = styled(Paper, { elevation: 6 })<ColorSampleRootProps>(({ color, dimensions: { width } }) => ({
    backgroundColor: color,
    height: width * 0.1,
    width: width * 0.1,
    maxWidth: 42,
    maxHeight: 42,
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "white",
    shadowOpacity: 0.8,
    alignItems: "center",
    justifyContent: "center",
}));

export const ActiveIcon = styled(CheckIcon)(() => ({
    fontSize: 22,
    color: "white",
}));
