import { useConfig } from "@peersyst/react-native-components";
import useThemeMode from "module/common/hook/useThemeMode";

export default function useDAppsExploreLink(): string {
    const theme = useThemeMode();
    const { exploreDAppsUrl } = useConfig("exploreDApps");

    return exploreDAppsUrl + (theme === "dark" ? "/dark" : "");
}
