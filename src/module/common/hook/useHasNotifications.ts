import useIsBackupDone from "module/settings/hook/useIsBackupDone";

const useHasNotifications = () => {
    const isBackupDone = useIsBackupDone();
    return !isBackupDone;
};

export default useHasNotifications;
