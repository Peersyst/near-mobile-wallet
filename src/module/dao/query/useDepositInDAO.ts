import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { DepositInDAOParams } from "module/common/service/CkbSdkService.types";
import { useMutation } from "react-query";

const useDepositInDAO = (index: number) => {
    return useMutation((params: DepositInDAOParams) => {
        const serviceInstance = serviceInstancesMap.get(index)!;
        return serviceInstance.depositInDAO(params);
    });
};

export default useDepositInDAO;
