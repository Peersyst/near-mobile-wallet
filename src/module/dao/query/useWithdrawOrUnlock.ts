import { useMutation } from "react-query";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { WithdrawOrUnlockParams } from "module/common/service/CkbSdkService.types";
import useAddUncommittedTransaction from "module/transaction/query/useAddUncommitedTransaction";

const useWithdrawOrUnlock = (index: number) => {
    const addUncommittedTransaction = useAddUncommittedTransaction();

    return useMutation(async (params: WithdrawOrUnlockParams) => {
        const serviceInstance = serviceInstancesMap.get(index)!;
        const hash = await serviceInstance.withdrawOrUnlock(params);
        if (hash) await addUncommittedTransaction(index, hash);
    });
};
export default useWithdrawOrUnlock;
