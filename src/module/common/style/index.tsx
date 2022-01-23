import { PropsWithChildren } from "react";
import { theme } from "module/common/style/theme";
import { ThemeProvider } from "styled-components/native";

const StylesProvider = ({ children }: PropsWithChildren<unknown>): JSX.Element => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default StylesProvider;
