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
import { translate } from "./translate";
import i18n from "locale/i18n";
import { I18nextProvider } from "react-i18next";

export interface CreateWrapperConfig {
    queryClientConfig?: QueryClientConfig;
}

export const createWrapper = ({ queryClientConfig }: CreateWrapperConfig = {}): FC<PropsWithChildren> => {
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
            <I18nextProvider i18n={i18n}>
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
            </I18nextProvider>
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
    // @ts-ignore @testing-library/react-hooks still uses react 17
): RenderHookResult<TProps, TResult> => renderHook<TProps, TResult>(callback, { wrapper: createWrapper({ queryClientConfig }), ...rest });

export * from "@testing-library/react-native";
export * from "@testing-library/jest-native/extend-expect";
export { customRender as render };
export * from "./fail-api-call";
export * from "./success-api-call";
export * from "./wait";
export * from "./formatBalance";
export { default as formatDate } from "./formatDate";
export { customRenderHook as renderHook };
export { translate };
