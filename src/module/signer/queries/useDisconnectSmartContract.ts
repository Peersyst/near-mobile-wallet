import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { MutationOptions } from "../../../query/react-query-overrides";
import { useToast } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";

export default function useDisconnectSmartContract({
    onSuccess,
    ...options
}: MutationOptions<string[], unknown, string> = {}): UseMutationResult<string[], unknown, string> {
    const { serviceInstance, index, network } = useServiceInstance();
    const queryClient = useQueryClient();
    const translate = useTranslate();
    const { showToast } = useToast();

    return useMutation((contractId: string) => serviceInstance.disconnectSmartContract(contractId), {
        onSuccess: async (contractId, ...args) => {
            await queryClient.invalidateQueries([Queries.IS_DAPP_CONNECTED, index, network]);
            await queryClient.invalidateQueries([Queries.RECOMMENDED_DAPPS]);
            await queryClient.invalidateQueries([Queries.GET_ACCOUNT_ACCESS_KEYS, index, network]);
            showToast(translate("disconnectSuccessfully"), { type: "success" });
            onSuccess?.(contractId, ...args);
        },
        ...options,
    });
}
