import useIsUpdateAvailable from "module/home/hook/useIsUpdateAvailable";
import UpdateRequiredModal from "../UpdateRequiredModal/UpdateRequiredModal";

export function AppUpdater(): JSX.Element {
    const { data: isUpdateAvailable } = useIsUpdateAvailable();
    return <UpdateRequiredModal defaultOpen={isUpdateAvailable} swipeable={false} closable={false} />;
}
