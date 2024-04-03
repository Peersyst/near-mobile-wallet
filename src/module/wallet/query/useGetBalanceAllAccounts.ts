import { useEffect, useState } from "react";
import useServiceInstance from "../hook/useServiceInstance";
import BigNumber from "bignumber.js";
import useWalletState from "../hook/useWalletState";
import ServiceInstances from "../state/ServiceInstances/ServiceInstances";

export interface useGetBalanceAllAccountsProps {
    balance: string;
}

export function useGetBalanceAllAccounts(): useGetBalanceAllAccountsProps {
    const { state } = useWalletState();
    const { network } = useServiceInstance();
    const [balance, setBalance] = useState("");

    useEffect(() => {
        const getBalances = async () => {
            const promises = state.wallets.map(async (wallet) => {
                const serviceInstances = ServiceInstances.getServiceInstance(network, wallet.index)!;
                const balance = await serviceInstances.getAccountBalance();
                return BigNumber(balance.available).toNumber();
            });

            const balances = await Promise.all(promises);
            const totalBalance = balances.reduce((acc, curr) => acc + curr, 0);
            setBalance(totalBalance.toString());
        };

        getBalances();
    }, [state.wallets, network]);

    return {
        balance,
    };
}
