import useNativeNavigation from "../../hooks/useNativeNavigation";
import { BottomBarLinkProps } from "../BottomBar.types";

type handleNavigationParams = Pick<BottomBarLinkProps, "link"> & { isActive: boolean };

function useJumpTo({ isActive, link }: handleNavigationParams) {
    const navigation = useNativeNavigation();
    if (!isActive) {
        navigation.navigate(link);
    }
}

export default useJumpTo;
