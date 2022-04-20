import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { DAOBalance } from "@peersyst/ckb-peersyst-sdk";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";

const useGetDAOBalance = (index?: number): QueryResult<DAOBalance> => {
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWallet;
    const serviceInstance = serviceInstancesMap.get(usedIndex);
    return useQuery(["daoBalance", usedIndex], () => serviceInstance?.getDAOBalance());
};

export default useGetDAOBalance;
