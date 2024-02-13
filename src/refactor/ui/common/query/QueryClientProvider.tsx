import { FC, ReactNode, useRef } from "react";
import { useToast } from "@peersyst/react-native-components";
import { QueryCache, QueryClient, QueryClientProvider as BaseQueryClientProvider } from "react-query";
import { handleErrorMessage } from "./handleErrorMessage";
import useTranslate from "module/common/hook/useTranslate";

const QueryClientProvider: FC<{ children?: ReactNode }> = ({ children }): JSX.Element => {
    const { showToast } = useToast();
    const translate = useTranslate("error");
    const queryClient = useRef(
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                    refetchOnWindowFocus: false,
                    staleTime: 600000,
                },
                mutations: {
                    onError: (error) => {
                        const { message, type } = handleErrorMessage(error, translate);
                        showToast(message, { type });
                    },
                },
            },
            queryCache: new QueryCache({
                onError: (error) => {
                    const { message, type } = handleErrorMessage(error, translate);
                    showToast(message, { type });
                },
            }),
        }),
    ).current;

    return <BaseQueryClientProvider client={queryClient}>{children}</BaseQueryClientProvider>;
};

export default QueryClientProvider;
