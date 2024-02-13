// Always import the module where the polyfills are defined.
import "./refactor/common/polyfills";
import "./refactor/data-access/api/OpenApiConfig";
import "refactor/ui/locale/i18n";

import Navigator from "./navigation/Navigator";
import { useLoad } from "module/common/query/useLoad";
import LogoPage from "module/common/component/layout/LogoPage/LogoPage";
import { Suspense } from "@peersyst/react-native-components";
import { LogBox, Platform, UIManager } from "react-native";
import Providers from "./refactor/ui/providers/Providers";
import { GestureHandlerRootView } from "react-native-gesture-handler";

if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

LogBox.ignoreLogs(["Setting a timer"]); // https://github.com/facebook/react-native/issues/12981#issuecomment-652745831
LogBox.ignoreLogs(["Require cycle:"]); // Consider refactoring to remove the need for a cycle
LogBox.ignoreLogs(["new NativeEventEmitter"]); // Warning from expo-clipboard (React 18)
LogBox.ignoreLogs(["Require cycles"]);

function App(): JSX.Element {
    const loading = useLoad();

    return (
        <Suspense fallback={<LogoPage />} isLoading={loading}>
            <Navigator />
        </Suspense>
    );
}

export default function Root(): JSX.Element | null {
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
