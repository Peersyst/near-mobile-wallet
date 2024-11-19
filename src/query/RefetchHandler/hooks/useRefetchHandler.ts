import { addEventListener } from "@react-native-community/netinfo";
import { useEffect, useCallback } from "react";
import useGetBalance from "module/wallet/query/useGetBalance";
import useGetActions from "module/transaction/query/useGetActions";
import { useAppState } from "@react-native-community/hooks";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

export function useRefetchHandler(): void {
    const { queryEnabled } = useServiceInstance();
    const { refetch: refetchBalance } = useGetBalance();
    const { refetch: refetchActions } = useGetActions();
    const appState = useAppState();

    const handleRefetch = useCallback(async () => {
        try {
            if (!queryEnabled) return;
            await Promise.allSettled([refetchActions(), refetchBalance()]);
        } catch {}
    }, [refetchActions, refetchBalance, queryEnabled]);

    useEffect(() => {
        const unsubscribe = addEventListener(async (state) => {
            if (state.isConnected) {
                await handleRefetch();
            }
        });

        return () => {
            unsubscribe();
        };
    }, [handleRefetch]);

    useEffect(() => {
        if (appState === "active") {
            handleRefetch();
        }
    }, [appState, handleRefetch]);
}
