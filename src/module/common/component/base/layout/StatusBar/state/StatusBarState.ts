import { StatusBarStyle } from "react-native";
import { atom } from "recoil";

export interface StatusBarState {
    style: StatusBarStyle;
}

const statusBarState = atom<StatusBarState>({
    key: "statusbar",
    default: { style: "default" },
});

export default statusBarState;