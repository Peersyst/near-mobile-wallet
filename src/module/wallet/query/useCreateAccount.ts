import { useMutation } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../refactor/ui/common/query/queries";
import { config } from "refactor/common/config";
import { NearSDKService } from "near-peersyst-sdk";
import { useInvalidateServiceInstanceQueries } from "./useInvalidateServiceInstanceQueries";
import { WalletStorage } from "../WalletStorage";

export interface UseSendNEARParams {
    name: string;
}

const useCreateAccount = (senderIndex: number) => {
    const { serviceInstance } = useServiceInstance(senderIndex);
    const invalidateServiceInstanceQueries = useInvalidateServiceInstanceQueries(senderIndex);

    return useMutation(
        async ({ name }: UseSendNEARParams): Promise<NearSDKService | undefined> => {
            const mnemonic = await WalletStorage.getMnemonic();
            return await serviceInstance.createNewAccountWithSameSecretKey(name, config.minBalanceToCreateAccount, undefined, mnemonic);
        },
        {
            onSuccess: () => {
                invalidateServiceInstanceQueries([Queries.GET_BALANCE, Queries.ACTIONS]);
            },
        },
    );
};

export default useCreateAccount;
