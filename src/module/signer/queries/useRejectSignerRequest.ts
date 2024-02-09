import { useToast } from "@peersyst/react-native-components";
import { SignerRequestDto, SignerRequestService } from "refactor/data-access/api/service";
import { useTranslate } from "module/common/hook/useTranslate";
import { MutationOptions } from "query-utils";
import { UseMutationResult, useMutation } from "react-query";

export default function useRejectSignerRequest({
    onSuccess,
    ...options
}: MutationOptions<SignerRequestDto, unknown, string> = {}): UseMutationResult<SignerRequestDto, unknown, string> {
    const translate = useTranslate();
    const { showToast } = useToast();

    return useMutation((id: string) => SignerRequestService.rejectSignerRequest(id), {
        onSuccess: (data, vars, context) => {
            showToast(translate("rejectRequestSuccessfully"), { type: "success" });
            onSuccess?.(data, vars, context);
        },
        ...options,
    });
}
