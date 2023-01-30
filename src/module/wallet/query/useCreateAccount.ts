import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { config } from "config";
import { NearSDKService } from "near-peersyst-sdk";
import { useInvalidateServiceInstanceQueries } from "./useInvalidateServiceInstanceQueries";

export interface UseSendNEARParams {
    name: string;
}

const useCreateAccount = (senderIndex: number) => {
    const { serviceInstance } = useServiceInstance(senderIndex);
    const invalidateServiceInstanceQueries = useInvalidateServiceInstanceQueries(senderIndex);

    return useMutation(
        async ({ name }: UseSendNEARParams): Promise<NearSDKService | undefined> => {
            return await serviceInstance.createNewAccountWithSameSecretKey(name, config.minBalanceToCreateAccount);
        },
        {
            onSuccess: () => {
                invalidateServiceInstanceQueries([Queries.GET_BALANCE, Queries.ACTIONS]);
            },
        },
    );
};

export default useCreateAccount;
