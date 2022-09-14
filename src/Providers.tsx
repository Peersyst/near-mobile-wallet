import { PropsWithChildren } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { ToastProvider } from "@peersyst/react-native-components";
import QueryClientProvider from "./query/QueryClientProvider";
import { ConfigProvider } from "./config";

const Providers = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
    <RecoilRoot>
        <SafeAreaProvider initialSafeAreaInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <ConfigProvider>
                <ToastProvider>
                    <QueryClientProvider>
                        {children}
                        {/*{process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}*/}
                    </QueryClientProvider>
                </ToastProvider>
            </ConfigProvider>
        </SafeAreaProvider>
    </RecoilRoot>
);

export default Providers;
