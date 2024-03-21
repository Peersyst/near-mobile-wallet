import useWalletState from "module/wallet/hook/useWalletState";
import { useEffect } from "react";

const useIsBackupDone = () => {
    const {
        state: { isBackupDone },
    } = useWalletState();
    useEffect(() => {
        const checkNotifications = async () => {
            return isBackupDone;
        };
        checkNotifications();
    }, []);

    return isBackupDone;
};

export default useIsBackupDone;
