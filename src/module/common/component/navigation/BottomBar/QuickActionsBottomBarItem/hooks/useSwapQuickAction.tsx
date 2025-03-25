import useGetSwapLink from "module/common/hook/useGetSwapLink";
import useNavigation from "module/common/hook/useNavigation";
import { MainScreens } from "../../../MainNavigatorGroup/MainScreens";
import { DAppScreens } from "module/dapp/navigator/DAppsNavigator.types";

export interface UseSwapQuickActionReturn {
    handleSwapPress: () => void;
}

export function useSwapQuickAction(): UseSwapQuickActionReturn {
    const navigate = useNavigation();
    const uriSwap = useGetSwapLink({ showIntentsIfPossible: true });

    function handleSwapPress(): void {
        // We need to cast the params of the navigate.navigate to any because the React Navigation types are not working properly
        navigate.navigate(MainScreens.DAPPS, { screen: DAppScreens.WEBVIEW, params: { url: uriSwap } } as any);
    }

    return {
        handleSwapPress,
    };
}
