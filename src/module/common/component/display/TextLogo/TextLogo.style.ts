import styled from "@peersyst/react-native-styled";
import { Text } from "react-native";
import { LogoIcon } from "icons";
import { ButtonStyles, Row } from "react-native-components";
import { TextLogoAppearance, TextLogoProps } from "./TextLogo.types";

const appearanceStyles: Record<TextLogoAppearance, ButtonStyles> = {
    dark: {},
    light: {}
}

export const TextLogoRoot = styled(Row, { alignItems: "center", gap: 8 })()

export const TextLogoIcon = styled(LogoIcon)<TextLogoProps>(({ theme, appearance }) => ({
    color: theme.palette.black,
    fontSize: 37
}))

export const TextRoot = styled(Row, { alignItems: "center" })()

export const TextLogoFont = styled(Text)(() => ({
    fontSize: 23,
    textTransform: "uppercase",
}))

export const TextLogoBold = styled(TextLogoFont)(() => ({ 
    fontWeight: "bold", 
    marginLeft: 1 
}))
