import { FC } from "react";
import { ThemeProvider } from "@peersyst/react-native-styled";
import darkTheme from "config/theme/darkTheme";

const DarkThemeProvider: FC = ({ children }): JSX.Element => <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;

export default DarkThemeProvider;
