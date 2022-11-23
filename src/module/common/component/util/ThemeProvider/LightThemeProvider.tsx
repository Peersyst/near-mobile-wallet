import { FC } from "react";
import { ThemeOverrideProvider } from "@peersyst/react-native-components";

const LightThemeProvider: FC = ({ children }): JSX.Element => <ThemeOverrideProvider theme="light">{children}</ThemeOverrideProvider>;

export default LightThemeProvider;
