import * as ExpoUpdates from "expo-updates";
import { useToast } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import { UseMutationResult, useMutation } from "react-query";
import { MutationOptions } from "query-utils";

export function useUpdateApp({ onError, ...options }: MutationOptions<void, unknown, void, unknown> = {}): UseMutationResult<
    void,
    unknown,
    void,
    unknown
> {
    const translateError = useTranslate("error");
    const { showToast } = useToast();

    return useMutation(
        async () => {
            await ExpoUpdates.fetchUpdateAsync();
            await ExpoUpdates.reloadAsync();
        },
        {
            onError: (error: unknown, variables: void, context: unknown) => {
                showToast(translateError("updateAppError"), { type: "error" });
                onError?.(error, variables, context);
            },
            ...options,
        },
    );
}
