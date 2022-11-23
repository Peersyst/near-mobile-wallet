import { GlassRoot } from "./Glass.styles";
import { ThemeProvider } from "@peersyst/react-native-styled";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import lightTheme from "config/theme/lightTheme";

export interface GlassProps {
    style?: ViewStyle;
    children?: ReactNode;
}

const Glass = (props: GlassProps): JSX.Element => (
    <ThemeProvider theme={lightTheme}>
        <GlassRoot {...props} />
    </ThemeProvider>
);

export default Glass;
