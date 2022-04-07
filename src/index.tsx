import { loadLocalization } from "locale";
import Providers from "./Providers";
import Navigator from "./Navigator";
import { useLoad } from "module/common/query/useLoad";
import LogoPage from "module/common/component/layout/LogoPage/LogoPage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ControlledSuspense from "module/common/component/base/feedback/ControlledSuspense/ControlledSuspense";

if (typeof BigInt === "undefined") global.BigInt = require("big-integer");

loadLocalization();

const App = (): JSX.Element => {
    const loading = useLoad();
    return (
        <ControlledSuspense fallback={<LogoPage />} isLoading={loading}>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flex: 1 }}
                style={{ overflow: "visible" }}
                bounces={false}
            >
                <Navigator />
            </KeyboardAwareScrollView>
        </ControlledSuspense>
    );
};

export default function Root(): JSX.Element {
    return (
        <Providers>
            <App />
        </Providers>
    );
}
