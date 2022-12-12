import { SelectorGroupProps } from "@peersyst/react-native-components";

export type WalletSelectorProps = Partial<
    Pick<SelectorGroupProps<number>, "label" | "name" | "required" | "disabled" | "readonly" | "onChange" | "value" | "defaultValue">
>;
