import { useToast } from "@peersyst/react-native-components";
import { SignerRequestService } from "module/api/service";
import { useTranslate } from "module/common/hook/useTranslate";
import { MutationOptions, UseMutationResult, useMutation } from "query-utils";

export default function useRejectMessageRequest({
    onSuccess,
    ...options
}: MutationOptions<unknown, unknown, string> = {}): UseMutationResult<unknown, unknown, string> {
    const translate = useTranslate();
    const { showToast } = useToast();

    return useMutation((id: string) => SignerRequestService.rejectMessageRequest(id), {
        onSuccess: (data, vars, context) => {
            showToast(translate("rejectRequestSuccessfully"), { type: "success" });
            onSuccess?.(data, vars, context);
        },
        ...options,
    });
}
