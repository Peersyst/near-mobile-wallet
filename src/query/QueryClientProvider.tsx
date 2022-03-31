import { FC } from "react";
import { useToast } from "react-native-components";
import { QueryCache, QueryClient, QueryClientProvider as BaseQueryClientProvider } from "react-query";
import { handleErrorMessage } from "./handleErrorMessage";

const QueryClientProvider: FC = ({ children }): JSX.Element => {
    const { showToast } = useToast();

    const queryClient = new QueryClient({
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
                console.error(error);
                showToast(message, { type });
            },
        }),
    });

    return <BaseQueryClientProvider client={queryClient}>{children}</BaseQueryClientProvider>;
};

export default QueryClientProvider;
