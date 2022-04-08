import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { DepositInDAOParams } from "module/common/service/CkbSdkService.types";
import { useMutation } from "react-query";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";

const useDepositInDAO = () => {
    const selectedWallet = useSelectedWalletIndex();
    const serviceInstance = serviceInstancesMap.get(selectedWallet)!;
    return useMutation((params: DepositInDAOParams) => serviceInstance.depositInDAO(params));
};

export default useDepositInDAO;
