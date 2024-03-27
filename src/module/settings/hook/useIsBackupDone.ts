import useWalletState from "module/wallet/hook/useWalletState";

const useIsBackupDone = () => {
    const {
        state: { isBackupDone },
    } = useWalletState();

    return isBackupDone;
};

export default useIsBackupDone;
