import useServiceInstance from "module/wallet/hook/useServiceInstance";
import WalletController, { ImportAccountManuallyReturn } from "module/wallet/utils/WalletController";
import { MutationOptions } from "query-utils";
import { UseMutationResult, useMutation } from "react-query";

export default function useManualAccountImport(
    options: MutationOptions<ImportAccountManuallyReturn, unknown, string> = {},
): UseMutationResult<ImportAccountManuallyReturn, unknown, string> {
    const { serviceInstance, network } = useServiceInstance(0);

    return useMutation(async (account: string) => {
        const accessKeys = await serviceInstance.getAccountFullAccessKeys(account);
        return await WalletController.importAccountManually(account, accessKeys, network);
    }, options);
}
