import { ThemeOverrideProvider } from "@peersyst/react-native-components";
import useWalletGradient from "module/wallet/hook/useWalletGradient";
import { PropsWithChildren } from "react";

const WalletColorProvider = ({ children }: PropsWithChildren<{}>) => {
    const [primary] = useWalletGradient();

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
