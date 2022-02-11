import styled from "@peersyst/react-native-styled";
import { Text } from "react-native";
import { LogoIcon } from "icons";
import { Row } from "react-native-components";

export const TextLogoRoot = styled(Row, { alignItems: "center" })()

export const TextLogoIcon = styled(LogoIcon)(({ theme }) => ({
    color: theme.palette.black,
    fontSize: 37
}))

export const TextRoot = styled(Row, { alignItems: "center" })(() => ({
    marginLeft: 8,
}))

export const TextLogoFont = styled(Text)(() => ({
    fontSize: 23,
    textTransform: "uppercase",
}))

export const TextLogoBold = styled(TextLogoFont)(() => ({ 
    fontWeight: "bold", 
    marginLeft: 1 
}))
