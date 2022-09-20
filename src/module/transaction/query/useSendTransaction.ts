import { useMutation } from "react-query";
import { SendTransactionParams } from "module/common/service/CkbSdkService.types";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useAddUncommittedTransaction from "module/transaction/query/useAddUncommitedTransaction";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import { WalletStorage } from "module/wallet/WalletStorage";

const useSendTransaction = (senderIndex: number) => {
    const network = useSelectedNetwork();
    const addUncommittedTransaction = useAddUncommittedTransaction();

    return useMutation(async (params: Omit<SendTransactionParams, "mnemonic">) => {
        const mnemonic = await WalletStorage.getMnemonic(senderIndex!);
        const serviceInstance = serviceInstancesMap.get(senderIndex)![network];
        const hash = await serviceInstance.sendTransaction({ ...params, mnemonic: mnemonic! });
        if (hash) await addUncommittedTransaction(senderIndex, network, hash);
    });
};

export default useSendTransaction;
