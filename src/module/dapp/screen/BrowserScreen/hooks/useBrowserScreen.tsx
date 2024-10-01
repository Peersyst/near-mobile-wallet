import { DAppScreens } from "module/dapp/navigator/DAppsNavigator.types";
import { cleanURL } from "../utils/cleanURL";
import { useBrowserScreenWebview } from "./useBrowserScreenBrowser";
import useNavigation from "module/common/hook/useNavigation";

export function useBrowserScreen() {
    const { navigate } = useNavigation();
    const { webviewProps, canGoBack, canGoForward, navigateBack, navigateForward, url, setUrl } = useBrowserScreenWebview();

    function handleOnSearch(search: string) {
        setUrl(cleanURL(search));
    }

    function handleOnGoBack() {
        if (canGoBack) {
            navigateBack();
        } else {
            navigate(DAppScreens.HOME);
        }
    }

    function handleOnGoForward() {
        navigateForward();
    }

    return {
        webviewProps,
        headerProps: {
            canGoBack,
            canGoForward,
            onGoBack: handleOnGoBack,
            onGoForward: handleOnGoForward,
            url,
            onSearch: handleOnSearch,
        },
        url,
    };
}
