import { PropsWithChildren } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { ToastProvider } from "@peersyst/react-native-components";
import QueryClientProvider from "../query/QueryClientProvider";
import { ConfigProvider } from "../refactor/ui/config";
import { I18nextProvider } from "react-i18next";
import i18n from "../locale/i18n";
import WalletColorProvider from "module/wallet/component/core/WalletColorProvider/WalletColorProvider";
import { StylesheetProvider } from "../stylesheets/StylesheetsProvider";

export default function Providers({ children }: PropsWithChildren<unknown>): JSX.Element {
    return (
        <RecoilRoot>
            <SafeAreaProvider>
                <I18nextProvider i18n={i18n}>
                    <ConfigProvider>
                        <StylesheetProvider>
                            <ToastProvider>
                                <QueryClientProvider>
                                    <WalletColorProvider>{children}</WalletColorProvider>
                                </QueryClientProvider>
                            </ToastProvider>
                        </StylesheetProvider>
                    </ConfigProvider>
                </I18nextProvider>
            </SafeAreaProvider>
        </RecoilRoot>
    );
}
