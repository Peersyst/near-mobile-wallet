import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import useWalletState from "module/wallet/hook/useWalletState";
import { DAOBalance } from "@peersyst/ckb-peersyst-sdk";
import { serviceInstancesMap } from "module/common/query/useLoad";

const useGetDAOBalance = (index?: number): QueryResult<DAOBalance> => {
    const {
        state: { wallets, selectedWallet },
    } = useWalletState();
    let usedIndex = 0;
    if (index !== undefined) usedIndex = index;
    else if (selectedWallet !== undefined) {
        usedIndex = selectedWallet < wallets.length ? selectedWallet : wallets.length - 1;
    }
    const serviceInstance = serviceInstancesMap.get(usedIndex);
    return useQuery(["daoBalance", usedIndex], () => serviceInstance?.getDAOBalance());
};

export default useGetDAOBalance;
