import { QueryResult } from "query-utils";
import { FullTransaction } from "module/common/service/CkbSdkService.types";
import { useQuery } from "react-query";
import useWallet from "module/wallet/hook/useWallet";
import walletState from "module/wallet/state/WalletState";
import { TransactionStatus } from "module/sdk";
import { useSetRecoilState } from "recoil";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useRef } from "react";
import useGetServiceInstance from "module/wallet/hook/useGetServiceInstance";

const useUncommittedTransactions = (index?: number): QueryResult<FullTransaction[]> => {
    const { serviceInstance, index: usedIndex, network } = useGetServiceInstance(index);
    const wallet = useWallet(usedIndex);
    const { uncommittedTransactionHashes } = wallet[network] || {};
    const setWalletState = useSetRecoilState(walletState);
    const rejectedHashes: string[] = useRef([]).current;

    return useQuery(
        ["uncommittedTransactions", usedIndex, network, uncommittedTransactionHashes],
        async () => {
            if (!uncommittedTransactionHashes) return [];

            const updatedUncommittedTransactionHashes: string[] = [];
            let shouldSync = false;
            const uncommittedTransactions: FullTransaction[] = [];

            for (const hash of uncommittedTransactionHashes) {
                try {
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
                } catch {
                    await WalletStorage.removeUncommittedTransactionHash(usedIndex, network, hash);
                    rejectedHashes.push(hash);
                }
            }
            if (shouldSync) {
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
