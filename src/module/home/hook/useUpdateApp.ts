import * as ExpoUpdates from "expo-updates";
import { useToast } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import { UseMutationResult, useMutation } from "react-query";

export function useUpdateApp(): UseMutationResult<void, unknown, void, unknown> {
    const translateError = useTranslate("error");
    const { showToast } = useToast();

    return useMutation(async () => {
        try {
            await ExpoUpdates.fetchUpdateAsync();
            await ExpoUpdates.reloadAsync();
        } catch (error) {
            showToast(translateError("updateAppError"), { type: "error" });
        }
    });
}
