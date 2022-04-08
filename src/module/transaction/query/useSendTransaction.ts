import { useMutation } from "react-query";
import { SendTransactionParams } from "module/common/service/CkbSdkService.types";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";

const useSendTransaction = () => {
    const selectedWallet = useSelectedWalletIndex();
    const serviceInstance = serviceInstancesMap.get(selectedWallet)!;
    return useMutation((params: SendTransactionParams) => serviceInstance.sendTransaction(params));
};

export default useSendTransaction;
