import { FC } from "react";
import { ThemeProvider } from "@peersyst/react-native-styled";
import lightTheme from "config/theme/lightTheme";

const LightThemeProvider: FC = ({ children }): JSX.Element => <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;

export default LightThemeProvider;
