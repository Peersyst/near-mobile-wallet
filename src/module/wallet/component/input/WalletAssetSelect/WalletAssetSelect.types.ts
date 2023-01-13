import { CoreFormControlledComponentProps, FormControlledComponentProps, LabelProps } from "@peersyst/react-native-components";
import { Asset } from "module/wallet/wallet.types";

export type WalletAssetSelectProps = FormControlledComponentProps<CoreFormControlledComponentProps<Asset | undefined, LabelProps>> & {
    index: number;
};
