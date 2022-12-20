import { FC, PropsWithChildren } from "react";
import { ThemeOverrideProvider } from "@peersyst/react-native-components";

const LightThemeProvider: FC<PropsWithChildren> = ({ children }: PropsWithChildren): JSX.Element => (
    <ThemeOverrideProvider theme="light">{children}</ThemeOverrideProvider>
);

export default LightThemeProvider;
