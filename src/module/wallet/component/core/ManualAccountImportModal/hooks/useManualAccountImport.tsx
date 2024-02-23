import useServiceInstance from "module/wallet/hook/useServiceInstance";
import WalletController, { ImportAccountManuallyReturn } from "module/wallet/utils/WalletController";
import { UseMutationResult, useMutation } from "react-query";
import { MutationOptions } from "refactor/ui/common/query/react-query-overrides";

export default function useManualAccountImport(
    options: MutationOptions<ImportAccountManuallyReturn, unknown, string> = {},
): UseMutationResult<ImportAccountManuallyReturn, unknown, string> {
    const { serviceInstance, network } = useServiceInstance(0);

    return useMutation(async (account: string) => {
        const accessKeys = await serviceInstance.getAccountFullAccessPublicKeys(account);
        return await WalletController.importAccountManually(account, accessKeys, network);
    }, options);
}
