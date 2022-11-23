import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { DepositInDAOParams } from "module/common/service/CkbSdkService.types";
import { useMutation } from "react-query";
import useAddUncommittedTransaction from "module/transaction/query/useAddUncommitedTransaction";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";

const useDepositInDAO = (index: number) => {
    const network = useSelectedNetwork();
    const addUncommittedTransaction = useAddUncommittedTransaction();

    return useMutation(async (params: DepositInDAOParams) => {
        const serviceInstance = serviceInstancesMap.get(index)![network];
        const hash = await serviceInstance.depositInDAO(params);
        if (hash) await addUncommittedTransaction(index, network, hash);
    });
};

export default useDepositInDAO;