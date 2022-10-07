import { FC } from "react";
import { ThemeOverrideProvider } from "@peersyst/react-native-components";

const DarkThemeProvider: FC = ({ children }): JSX.Element => <ThemeOverrideProvider theme="dark">{children}</ThemeOverrideProvider>;

export default DarkThemeProvider;
