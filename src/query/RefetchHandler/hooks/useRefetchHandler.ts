import { NetInfoState, useNetInfo } from "@react-native-community/netinfo";
import { useEffect, useCallback, useRef } from "react";
import useGetBalance from "module/wallet/query/useGetBalance";
import useGetActions from "module/transaction/query/useGetActions";
import { useAppState } from "@react-native-community/hooks";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

export function useRefetchHandler(): void {
    const { queryEnabled } = useServiceInstance();
    const { refetch: refetchBalance } = useGetBalance();
    const { refetch: refetchActions } = useGetActions();
    const appState = useAppState();
    const onlineState = useNetInfo();
    const latestOnlineStateRef = useRef<NetInfoState>();

    const handleRefetch = useCallback(async () => {
        try {
            if (!queryEnabled) return;
            await Promise.allSettled([refetchActions(), refetchBalance()]);
        } catch {}
    }, [refetchActions, refetchBalance, queryEnabled]);

    useEffect(() => {
        if (appState === "active" && !latestOnlineStateRef.current?.isConnected && onlineState.isConnected) {
            latestOnlineStateRef.current = onlineState;
            handleRefetch();
        }
    }, [appState, onlineState, handleRefetch]);
}
