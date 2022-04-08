import { useQuery } from "react-query";
import useWalletState from "module/wallet/hook/useWalletState";
import { serviceInstancesMap } from "module/common/query/useLoad";

const useGetBalance = (index?: number) => {
    const {
        state: { wallets, selectedWallet },
    } = useWalletState();
    let usedIndex = 0;
    if (index !== undefined) usedIndex = index;
    else if (selectedWallet !== undefined) {
        usedIndex = selectedWallet < wallets.length ? selectedWallet : wallets.length - 1;
    }
    const serviceInstance = serviceInstancesMap.get(usedIndex);
    return useQuery(["balance", usedIndex, wallets.length], () => serviceInstance?.getCKBBalance());
};

export default useGetBalance;
