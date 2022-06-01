import { GlassRoot } from "./Glass.styles";
import { ThemeProvider } from "@peersyst/react-native-styled";
import { theme } from "module/common/style/theme";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface GlassProps {
    style?: ViewStyle;
    children?: ReactNode;
}

const Glass = (props: GlassProps): JSX.Element => (
    <ThemeProvider theme={theme}>
        <GlassRoot {...props} />
    </ThemeProvider>
);

export default Glass;
