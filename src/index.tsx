import { StatusBar } from "expo-status-bar";
import { loadLocalization } from "locale";
import Providers from "./Providers";
import Navigator from "./Navigator";
import { useLoad } from "module/common/query/useLoad";
import { Text } from "react-native";

loadLocalization();

const App = (): JSX.Element => {
    const loading = useLoad();
    return (
        <>
            {loading ? <Text>Loading app</Text> : <Navigator />}
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
