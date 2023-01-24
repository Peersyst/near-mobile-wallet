import { FC, PropsWithChildren } from "react";
import { ThemeOverrideProvider } from "@peersyst/react-native-components";

const DarkThemeProvider: FC<PropsWithChildren> = ({ children }: PropsWithChildren): JSX.Element => (
    <ThemeOverrideProvider theme="dark">{children}</ThemeOverrideProvider>
);

export default DarkThemeProvider;
