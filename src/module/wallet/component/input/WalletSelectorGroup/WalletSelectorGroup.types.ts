import { SelectorGroupProps } from "@peersyst/react-native-components";

export type WalletSelectorProps = SelectorGroupProps<number> & {
    minBalance?: string;
};
