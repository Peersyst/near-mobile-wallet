import { FC, PropsWithChildren } from "react";
import { ThemeOverrideProvider } from "@peersyst/react-native-components";
import WalletColorProvider from "module/wallet/component/core/WalletColorProvider/WalletColorProvider";

const DarkThemeProvider: FC<PropsWithChildren> = ({ children }: PropsWithChildren): JSX.Element => (
    <ThemeOverrideProvider theme="dark">
        <WalletColorProvider>{children}</WalletColorProvider>
    </ThemeOverrideProvider>
);

export default DarkThemeProvider;
