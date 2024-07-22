import useIsBackupDone from "module/settings/hook/useIsBackupDone";
import useWalletState from "module/wallet/hook/useWalletState";

export interface UseHasNotificationsReturn {
    isLoading: boolean;
    hasNotifications: boolean;
}

export default function useHasNotifications(): UseHasNotificationsReturn {
    const {
        state: { loading },
    } = useWalletState();
    const isBackupDone = useIsBackupDone();

    return {
        isLoading: loading,
        hasNotifications: !isBackupDone,
    };
}
