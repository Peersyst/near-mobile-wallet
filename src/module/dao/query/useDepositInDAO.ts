import { serviceInstancesMap } from "module/common/query/useLoad";
import { DepositInDAOParams } from "module/common/service/CkbSdkService.types";
import useWalletState from "module/wallet/hook/useWalletState";
import { useMutation } from "react-query";

const useDepositInDAO = () => {
    const {
        state: { selectedWallet },
    } = useWalletState();
    const usedIndex = selectedWallet ?? 0;
    const serviceInstance = serviceInstancesMap.get(usedIndex)!;
    return useMutation((params: DepositInDAOParams) => serviceInstance.depositInDAO(params));
};

export default useDepositInDAO;
