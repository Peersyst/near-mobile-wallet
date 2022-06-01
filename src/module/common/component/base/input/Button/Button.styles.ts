import { Row } from "../../layout/Row";
import { ButtonRootProps, ButtonContainerProps } from "./Button.types";
import { View } from "react-native";
import styled from "@peersyst/react-native-styled";

/**
 * Container for the loader
 */
export const ButtonLoader = styled(Row, { alignItems: "center", justifyContent: "center" })(() => ({
    position: "absolute",
    alignSelf: "center",
}));

/**
 * Main button styles
 */
export const ButtonRoot = styled(View)<ButtonRootProps>(({ theme, fullWidth }) => ({
    alignSelf: fullWidth ? undefined : "flex-start",
    borderRadius: theme.borderRadius,
}));

export const ButtonContent = styled(Row, { gap: 16, alignItems: "center" })<ButtonContainerProps>(({ isLoading }) => ({
    opacity: isLoading ? 0 : 1,
}));
