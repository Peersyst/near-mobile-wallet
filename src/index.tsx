import { loadLocalization } from "locale";
import Providers from "./Providers";
import Navigator from "./Navigator";
import { useLoad } from "module/common/query/useLoad";
import LogoPage from "module/common/component/layout/LogoPage/LogoPage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

loadLocalization();

const App = (): JSX.Element => {
    const loading = useLoad();

    return loading ? (
        <LogoPage />
    ) : (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}
            style={{ overflow: "visible" }}
            bounces={false}
        >
            <Navigator />
        </KeyboardAwareScrollView>
    );
};

export default function Root(): JSX.Element {
    return (
        <Providers>
            <App />
        </Providers>
    );
}
