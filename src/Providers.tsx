import { PropsWithChildren } from "react";
import StylesProvider from "module/common/style";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ModalProvider } from "react-native-components";
import { ToastProvider } from "module/common/component/base/feedback/ToastProvider";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            notifyOnChangeProps: "tracked",
        },
    },
});

const Providers = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
    <RecoilRoot>
        <QueryClientProvider client={queryClient}>
            <SafeAreaProvider initialSafeAreaInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                <StylesProvider>
                    <ToastProvider>
                        <ModalProvider>
                            {children}
                            {/*{process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}*/}
                        </ModalProvider>
                    </ToastProvider>
                </StylesProvider>
            </SafeAreaProvider>
        </QueryClientProvider>
    </RecoilRoot>
);

export default Providers;
