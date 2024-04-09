import * as Updates from "expo-updates";

export default function useIsUpdateAvailable() {
    const { isUpdateAvailable } = Updates.useUpdates();
    return isUpdateAvailable;
}
