import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import useServiceInstance from "../hook/useServiceInstance";
import Queries from "../../../query/queries";
import { MutationOptions } from "../../../query/react-query-overrides";

export default function useDeleteKey({
    onSuccess,
    ...options
}: MutationOptions<string, void, string, void>): UseMutationResult<string, unknown, string> {
    const { serviceInstance, index, network } = useServiceInstance();
    const queryClient = useQueryClient();

    return useMutation(async (publicKey: string) => await serviceInstance.deleteAccessKey(publicKey), {
        onSuccess: async (...args) => {
            await queryClient.invalidateQueries([Queries.GET_ACCOUNT_ACCESS_KEYS, index, network]);
            onSuccess?.(...args);
        },
        ...options,
    });
}
