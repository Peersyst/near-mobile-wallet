import { SelectProps } from "@peersyst/react-native-components";
import { NetworkType } from "module/settings/state/SettingsState";

export interface SelectNetworkProps extends Omit<SelectProps<NetworkType>, "options" | "value" | "defaultValue" | "onChange"> {}
