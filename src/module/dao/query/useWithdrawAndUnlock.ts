import { WithdrawAndUnlockParams } from "module/common/service/mock/CkbServiceMock.types";
import useWalletState from "module/wallet/hook/useWalletState";
import { useMutation } from "react-query";

const useWithdrawAndUnlock = (index: number) => {
    const {
        state: { wallets },
    } = useWalletState();
    const serviceInstance = wallets[index].serviceInstance!;

    return useMutation((params: WithdrawAndUnlockParams) => serviceInstance.withdrawAndUnlock(params));
};

export default useWithdrawAndUnlock;
