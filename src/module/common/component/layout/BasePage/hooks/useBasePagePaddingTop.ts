import Constants from "expo-constants";
import { ViewStyle } from "react-native";
import { TOOLBAR_HEIGHT } from "../../Toolbar/Toolbar.styles";

export interface UseBasePagePaddingParams {
    watchStatusBar?: boolean;
    header?: boolean;
}

export function useBasePagePaddingTop({ watchStatusBar = true, header = true }: UseBasePagePaddingParams): ViewStyle["padding"] {
    const statusBarHeight = watchStatusBar ? Constants.statusBarHeight : 0;
    return header ? statusBarHeight + TOOLBAR_HEIGHT : statusBarHeight;
}
