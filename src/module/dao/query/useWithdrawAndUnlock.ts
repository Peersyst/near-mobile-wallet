import { useMutation } from "react-query";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { WithdrawAndUnlockParams } from "module/common/service/CkbSdkService.types";

const useWithdrawAndUnlock = (index: number) => {
    const serviceInstance = serviceInstancesMap.get(index)!;
    return useMutation((params: WithdrawAndUnlockParams) => serviceInstance.withdrawAndUnlock(params));
};
export default useWithdrawAndUnlock;
