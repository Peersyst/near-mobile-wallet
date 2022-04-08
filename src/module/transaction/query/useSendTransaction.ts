import { useMutation } from "react-query";
import useWalletState from "module/wallet/hook/useWalletState";
import { SendTransactionParams } from "module/common/service/CkbSdkService.types";
import { serviceInstancesMap } from "module/common/query/useLoad";

const useSendTransaction = () => {
    const {
        state: { selectedWallet },
    } = useWalletState();
    const usedIndex = selectedWallet ?? 0;
    const serviceInstance = serviceInstancesMap.get(usedIndex)!;
    return useMutation((params: SendTransactionParams) => serviceInstance.sendTransaction(params));
};

export default useSendTransaction;
