import useIsUpdateAvailable from "module/home/hook/useIsUpdateAvailable";
import UpdateRequiredModal from "../UpdateRequiredModal/UpdateRequiredModal";

export function AppUpdater(): JSX.Element {
    const isUpdateAvailable = useIsUpdateAvailable();
    return <UpdateRequiredModal open={isUpdateAvailable} swipeable={false} closable={false} />;
}
