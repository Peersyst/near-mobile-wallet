import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { DAOUnlockableAmount } from "ckb-peersyst-sdk";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";

const useGetDAOUnlockableAmounts = (index?: number): QueryResult<DAOUnlockableAmount[]> => {
    const network = useSelectedNetwork();
    const selectedWalletIndex = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWalletIndex;
    return useQuery(
        ["daoUnlockableAmounts", usedIndex, network],
        () => serviceInstancesMap.get(usedIndex)![network].getDAOUnlockableAmounts() ?? [],
        {
            refetchInterval: 15000,
        },
    );
};

export default useGetDAOUnlockableAmounts;
