import { useMutation } from "react-query";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { WithdrawOrUnlockParams } from "module/common/service/CkbSdkService.types";

const useWithdrawOrUnlock = (index: number) => {
    const serviceInstance = serviceInstancesMap.get(index)!;
    return useMutation((params: WithdrawOrUnlockParams) => serviceInstance.withdrawOrUnlock(params));
};
export default useWithdrawOrUnlock;
