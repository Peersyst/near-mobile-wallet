import { QueryResult } from "query-utils";
import { FullTransaction } from "module/common/service/CkbSdkService.types";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";
import { useQuery } from "react-query";
import useWallet from "module/wallet/hook/useWallet";
import walletState, { serviceInstancesMap } from "module/wallet/state/WalletState";
import { TransactionStatus } from "module/sdk";
import { useSetRecoilState } from "recoil";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useRef } from "react";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";

const useUncommittedTransactions = (index?: number): QueryResult<FullTransaction[]> => {
    const network = useSelectedNetwork();
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWallet;
    const wallet = useWallet(usedIndex);
    const { uncommittedTransactionHashes } = wallet[network] || {};
    const setWalletState = useSetRecoilState(walletState);
    const rejectedHashes: string[] = useRef([]).current;

    return useQuery(
        ["uncommittedTransactions", usedIndex, network, uncommittedTransactionHashes],
        async () => {
            if (!uncommittedTransactionHashes) return [];

            const serviceInstance = serviceInstancesMap.get(usedIndex)![network];

            const updatedUncommittedTransactionHashes: string[] = [];
            let shouldSync = false;
            const uncommittedTransactions: FullTransaction[] = [];

            for (const hash of uncommittedTransactionHashes) {
                const tx = await serviceInstance.getTransaction(hash);
                if (tx.status !== TransactionStatus.COMMITTED) {
                    uncommittedTransactions.push(tx);
                    updatedUncommittedTransactionHashes.push(hash);
                    // If rejected keep it in the list but remove it from storage in order to show it just in the current session
                    if (tx.status === TransactionStatus.REJECTED && !rejectedHashes.find((h) => h === hash)) {
                        await WalletStorage.removeUncommittedTransactionHash(usedIndex, network, hash);
                        rejectedHashes.push(hash);
                    }
                    // If committed remove it and sync in order to refresh data and refetch useGetTransactiions
                } else {
                    await WalletStorage.removeUncommittedTransactionHash(usedIndex, network, hash);
                    shouldSync = true;
                }
            }
            if (shouldSync) {
                await serviceInstance.synchronize();
                setWalletState((state) => ({
                    ...state,
                    wallets: state.wallets.map((w) => {
                        if (w.index !== usedIndex) return w;
                        else {
                            const networkInfo = w[network];
                            return {
                                ...w,
                                [network]: {
                                    ...networkInfo,
                                    uncommittedTransactionHashes: updatedUncommittedTransactionHashes,
                                },
                            };
                        }
                    }),
                }));
            }
            return uncommittedTransactions;
        },
        {
            refetchInterval: 15000,
        },
    );
};

export default useUncommittedTransactions;
