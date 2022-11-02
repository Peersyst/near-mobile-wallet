import { DepositInDAOParams } from "module/common/service/CkbSdkService.types";
import { useMutation } from "react-query";
import useAddUncommittedTransaction from "module/transaction/query/useAddUncommitedTransaction";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import { WalletStorage } from "module/wallet/WalletStorage";
import useGetServiceInstance from "module/wallet/hook/useGetServiceInstance";

const useDepositInDAO = (index: number) => {
    const network = useSelectedNetwork();
    const { serviceInstance } = useGetServiceInstance(index);
    const addUncommittedTransaction = useAddUncommittedTransaction();

    return useMutation(async (params: Omit<DepositInDAOParams, "mnemonic">) => {
        const mnemonic = await WalletStorage.getMnemonic(index);
        const hash = await serviceInstance.depositInDAO({ ...params, mnemonic: mnemonic! });
        if (hash) await addUncommittedTransaction(index, network, hash);
    });
};

export default useDepositInDAO;
