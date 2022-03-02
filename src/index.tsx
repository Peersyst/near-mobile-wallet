import { StatusBar } from "expo-status-bar";
import { loadLocalization } from "locale";
import Providers from "./Providers";
import Navigator from "./Navigator";
import { useLoad } from "module/common/query/useLoad";
import LogoPage from "module/common/component/layout/LogoPage/LogoPage";

loadLocalization();

const App = (): JSX.Element => {
    const loading = useLoad();
    return (
        <>
            {loading ? <LogoPage /> : <Navigator />}
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
