import { DepositInDAOParams } from "module/common/service/mock/CkbServiceMock.types";
import useWalletState from "module/wallet/hook/useWalletState";
import { useMutation } from "react-query";

const useDepositInDAO = () => {
    const {
        state: { wallets, selectedWallet },
    } = useWalletState();
    const usedIndex = selectedWallet ?? 0;
    const serviceInstance = wallets[usedIndex].serviceInstance!;
    return useMutation((params: DepositInDAOParams) => serviceInstance.depositInDAO(params));
};

export default useDepositInDAO;
