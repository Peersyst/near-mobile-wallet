import { ThemeOverrideProvider } from "@peersyst/react-native-components";
import useIsUpdateAvailable from "module/home/hook/useIsUpdateAvailable";
import UpdateRequiredModal from "../UpdateRequiredModal/UpdateRequiredModal";

export function UpdateApp(): JSX.Element {
    const isUpdateAvailable = useIsUpdateAvailable();

    return (
        <ThemeOverrideProvider>
            <UpdateRequiredModal open={isUpdateAvailable} swipeable={false} closable={false} />
        </ThemeOverrideProvider>
    );
}
