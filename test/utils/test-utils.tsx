import { FC, PropsWithChildren, ReactElement } from "react";
import { render, RenderAPI, RenderOptions } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider, QueryClientConfig } from "react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { renderHook, RenderHookOptions, RenderHookResult } from "@testing-library/react-hooks";
import { deepmerge } from "@peersyst/react-utils";
import { NavigationContainer } from "@react-navigation/native";
import { ModalProvider } from "@peersyst/react-native-components";
import { ConfigProvider } from "config";
import i18n from "../../src/locale/i18n";

export interface CreateWrapperConfig {
    queryClientConfig?: QueryClientConfig;
}

export const createWrapper = ({ queryClientConfig }: CreateWrapperConfig = {}): FC => {
    const queryClient = new QueryClient(
        deepmerge(
            {
                defaultOptions: {
                    queries: {
                        retry: false,
                    },
                },
            },
            queryClientConfig,
        ),
    );

    return function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
        return (
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <SafeAreaProvider initialSafeAreaInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                        <ConfigProvider>
                            <NavigationContainer>
                                <ModalProvider>{children}</ModalProvider>
                            </NavigationContainer>
                        </ConfigProvider>
                    </SafeAreaProvider>
                </QueryClientProvider>
            </RecoilRoot>
        );
    };
};

const customRender = (
    ui: ReactElement,
    { queryClientConfig, ...rest }: Omit<RenderOptions, "wrapper"> & CreateWrapperConfig = {},
): RenderAPI => render(ui, { wrapper: createWrapper({ queryClientConfig }), ...rest });

const customRenderHook = <TProps, TResult>(
    callback: (props: TProps) => TResult,
    { queryClientConfig, ...rest }: Omit<RenderHookOptions<TProps>, "wrapper"> & CreateWrapperConfig = {},
): RenderHookResult<TProps, TResult> => renderHook<TProps, TResult>(callback, { wrapper: createWrapper({ queryClientConfig }), ...rest });

const translate: (...params: any) => string = i18n.t;

export * from "@testing-library/react-native";
export * from "@testing-library/jest-native";
export { customRender as render };
export * from "./fail-api-call";
export * from "./success-api-call";
export * from "./wait";
export { customRenderHook as renderHook };
export { translate };
