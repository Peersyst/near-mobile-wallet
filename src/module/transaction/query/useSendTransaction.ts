import { useMutation } from "react-query";
import { SendTransactionParams } from "module/common/service/CkbSdkService.types";
import useAddUncommittedTransaction from "module/transaction/query/useAddUncommitedTransaction";
/* import { WalletStorage } from "module/wallet/WalletStorage"; */
import useServiceInstance from "module/wallet/hook/useServiceInstance";

const useSendTransaction = (senderIndex: number) => {
    const { serviceInstance, network } = useServiceInstance(senderIndex);
    const addUncommittedTransaction = useAddUncommittedTransaction();

    return useMutation(async (params: Omit<SendTransactionParams, "mnemonic">) => {
        //TODO: get mnemonic from wallet storage in ckb
        //const mnemonic = await WalletStorage.getMnemonic(senderIndex!);
        const hash = await serviceInstance.sendTransaction(params.to, params.amount.toString());
        if (hash) await addUncommittedTransaction(senderIndex, network, hash);
    });
};

export default useSendTransaction;
