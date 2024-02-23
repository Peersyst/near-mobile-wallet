import { NetworkType } from "module/common/types";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";

export default function (): NetworkType {
    return useRecoilValue(settingsState).network;
}
