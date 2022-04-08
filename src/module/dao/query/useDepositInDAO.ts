import { DepositInDAOParams } from "module/common/service/mock/CkbServiceMock.types";
import useWalletState from "module/wallet/hook/useWalletState";
import { useMutation } from "react-query";

const useDepositInDAO = (index: number) => {
    const {
        state: { wallets },
    } = useWalletState();
    const serviceInstance = wallets[index].serviceInstance!;
    return useMutation((params: DepositInDAOParams) => serviceInstance.depositInDAO(params));
};

export default useDepositInDAO;
