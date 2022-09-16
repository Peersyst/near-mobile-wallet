import { FC, useRef } from "react";
import { useToast } from "@peersyst/react-native-components";
import { QueryCache, QueryClient, QueryClientProvider as BaseQueryClientProvider } from "react-query";
import { useHandleErrorMessage } from "./useHandleErrorMessage";

const QueryClientProvider: FC = ({ children }): JSX.Element => {
    const { showToast } = useToast();
    const handleErrorMessage = useHandleErrorMessage();
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
                        const { message, type } = handleErrorMessage(error);
                        showToast(message, { type });
                    },
                },
            },
            queryCache: new QueryCache({
                onError: (error) => {
                    const { message, type } = handleErrorMessage(error);
                    showToast(message, { type });
                },
            }),
        }),
    ).current;

    return <BaseQueryClientProvider client={queryClient}>{children}</BaseQueryClientProvider>;
};

export default QueryClientProvider;
