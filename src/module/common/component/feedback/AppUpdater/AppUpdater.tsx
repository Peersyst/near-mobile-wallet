import useIsUpdateAvailable from "module/home/hook/useIsUpdateAvailable";
import UpdateRequiredModal from "../UpdateRequiredModal/UpdateRequiredModal";
import { useConfig } from "@peersyst/react-components-core";

export function AppUpdater(): JSX.Element {
    const { data: isUpdateAvailable } = useIsUpdateAvailable();
    const expoUpdatesEnabled = useConfig("expoUpdatesEnabled");

    return <UpdateRequiredModal defaultOpen={!!isUpdateAvailable && expoUpdatesEnabled} swipeable={false} closable={false} />;
}
