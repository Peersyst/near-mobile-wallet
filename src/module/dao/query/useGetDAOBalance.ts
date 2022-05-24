import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { DAOBalance } from "ckb-peersyst-sdk";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";

const useGetDAOBalance = (index?: number): QueryResult<DAOBalance> => {
    const network = useSelectedNetwork();
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWallet;
    return useQuery(
        ["daoBalance", usedIndex, network],
        () => {
            const serviceInstance = serviceInstancesMap.get(usedIndex)?.[network];
            return serviceInstance?.getDAOBalance();
        },
        { refetchInterval: 15000 },
    );
};

export default useGetDAOBalance;
