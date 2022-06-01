import { PropsWithChildren } from "react";
import StylesProvider from "module/common/style";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { ToastProvider } from "module/common/component/base/feedback/ToastProvider";
import QueryClientProvider from "./query/QueryClientProvider";

const Providers = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
    <RecoilRoot>
        <SafeAreaProvider initialSafeAreaInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <StylesProvider>
                <ToastProvider>
                    <QueryClientProvider>
                        {children}
                        {/*{process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}*/}
                    </QueryClientProvider>
                </ToastProvider>
            </StylesProvider>
        </SafeAreaProvider>
    </RecoilRoot>
);

export default Providers;
