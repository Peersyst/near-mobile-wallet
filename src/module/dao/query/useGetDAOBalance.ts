import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { DAOBalance } from "ckb-peersyst-sdk";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";

const useGetDAOBalance = (index?: number): QueryResult<DAOBalance> => {
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWallet;
    return useQuery(
        ["daoBalance", usedIndex],
        () => {
            const serviceInstance = serviceInstancesMap.get(usedIndex);
            return serviceInstance?.getDAOBalance();
        },
        { refetchInterval: 15000 },
    );
};

export default useGetDAOBalance;
