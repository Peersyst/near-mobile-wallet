import Providers from "./Providers";
import Navigator from "./navigation/Navigator";
import { useLoad } from "module/common/query/useLoad";
import LogoPage from "module/common/component/layout/LogoPage/LogoPage";
import { Suspense } from "@peersyst/react-native-components";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import { Platform, UIManager } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "module/api/OpenApiConfig";

if (typeof BigInt === "undefined") global.BigInt = require("big-integer");

if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const App = (): JSX.Element => {
    const loading = useLoad();
    const { loading: loadingSettings = false } = useRecoilValue(settingsState);

    return (
        <Suspense fallback={<LogoPage />} isLoading={loading || loadingSettings}>
            <Navigator />
        </Suspense>
    );
};

export default function Root(): JSX.Element {
    return (
        // `GestureHandlerRootView` enables all `react-native-gesture-handler` features.
        // For example, `Swipeable` from `react-native-gesture-handler` will not trigger `Touchable`'s `onPress`.
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Providers>
                <App />
            </Providers>
        </GestureHandlerRootView>
    );
}
