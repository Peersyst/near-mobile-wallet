import { PropsWithChildren } from "react";
import { theme } from "module/common/style/theme";
import { ThemeProvider } from "@peersyst/react-native-styled";

const StylesProvider = ({ children }: PropsWithChildren<unknown>): JSX.Element => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default StylesProvider;
