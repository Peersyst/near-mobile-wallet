import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { DepositInDAOParams } from "module/common/service/CkbSdkService.types";
import { useMutation } from "react-query";
import useAddUncommittedTransaction from "module/transaction/query/useAddUncommitedTransaction";

const useDepositInDAO = (index: number) => {
    const addUncommittedTransaction = useAddUncommittedTransaction();

    return useMutation(async (params: DepositInDAOParams) => {
        const serviceInstance = serviceInstancesMap.get(index)!;
        const hash = await serviceInstance.depositInDAO(params);
        if (hash) await addUncommittedTransaction(index, hash);
    });
};

export default useDepositInDAO;
