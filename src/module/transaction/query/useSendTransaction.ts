import { useMutation } from "react-query";
import { SendTransactionParams } from "module/common/service/CkbSdkService.types";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";

const useSendTransaction = () => {
    const selectedWallet = useSelectedWalletIndex();
    return useMutation(
        (params: SendTransactionParams) => {
            const serviceInstance = serviceInstancesMap.get(selectedWallet)!;
            return serviceInstance.sendTransaction(params);
        },
        {
            onSuccess: async () => {
                await serviceInstancesMap.get(selectedWallet)!.synchronize();
            },
        },
    );
};

export default useSendTransaction;
