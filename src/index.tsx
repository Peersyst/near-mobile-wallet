import { StatusBar } from "expo-status-bar";
import { loadLocalization } from "locale";
import Providers from "./Providers";
import Navigator from "./Navigator";
import { useLoad } from "module/common/query/useLoad";
import LogoPage from "module/common/component/layout/LogoPage/LogoPage";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

loadLocalization();

const App = (): JSX.Element => {
    const loading = useLoad();
    return (
        <>
            {loading ? (
                <LogoPage />
            ) : (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={{ flex: 1, overflow: "hidden" }}>
                        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} style={{ overflow: "visible" }}>
                            <Navigator />
                        </KeyboardAwareScrollView>
                    </View>
                </TouchableWithoutFeedback>
            )}
            <StatusBar />
        </>
    );
};

export default function Root(): JSX.Element {
    return (
        <Providers>
            <App />
        </Providers>
    );
}
