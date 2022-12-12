import { SelectorGroupProps } from "@peersyst/react-native-components";

export type WalletSelectorProps = Pick<SelectorGroupProps<number>, "onChange" | "value" | "defaultValue"> &
    Partial<Pick<SelectorGroupProps<number>, "label">>;
