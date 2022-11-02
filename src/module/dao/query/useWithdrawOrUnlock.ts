import { useMutation } from "react-query";
import { WithdrawOrUnlockParams } from "module/common/service/CkbSdkService.types";
import useAddUncommittedTransaction from "module/transaction/query/useAddUncommitedTransaction";
import { WalletStorage } from "module/wallet/WalletStorage";
import useGetServiceInstance from "module/wallet/hook/useGetServiceInstance";

const useWithdrawOrUnlock = (index: number) => {
    const { network, serviceInstance } = useGetServiceInstance(index);
    const addUncommittedTransaction = useAddUncommittedTransaction();

    return useMutation(async (params: Omit<WithdrawOrUnlockParams, "mnemonic">) => {
        const mnemonic = await WalletStorage.getMnemonic(index);
        const hash = await serviceInstance.withdrawOrUnlock({ ...params, mnemonic: mnemonic! });
        if (hash) await addUncommittedTransaction(index, network, hash);
    });
};
export default useWithdrawOrUnlock;
