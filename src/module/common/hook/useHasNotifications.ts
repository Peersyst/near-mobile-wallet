import useIsBackupDone from "module/settings/hook/useIsBackupDone";

export default function useHasNotifications() {
    const isBackupDone = useIsBackupDone();
    return !isBackupDone;
}
