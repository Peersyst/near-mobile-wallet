import useNavigation from "module/common/hook/useNavigation";
import { MainScreens } from "../../../MainNavigatorGroup/MainScreens";

export interface UseBuyQuickActionReturn {
    handleBuyPress: () => void;
}

export function useBuyQuickAction(): UseBuyQuickActionReturn {
    const navigate = useNavigation();

    function handleBuyPress() {
        navigate.navigate(MainScreens.FIAT_ORDERS);
    }

    return {
        handleBuyPress,
    };
}
