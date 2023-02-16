import { ThemeOverrideProvider } from "@peersyst/react-native-components";
import useWalletColor from "module/wallet/hook/useWalletColor";
import { PropsWithChildren } from "react";

const WalletColorProvider = ({ children }: PropsWithChildren<{}>) => {
    const primary = useWalletColor();

    return (
        <ThemeOverrideProvider
            overrides={(theme) => ({
                ...theme,
                palette: {
                    ...theme.palette,
                    primary,
                },
            })}
        >
            {children}
        </ThemeOverrideProvider>
    );
};

export default WalletColorProvider;
