import { CoreFormControlledComponentProps, FormControlledComponentProps, LabelProps } from "@peersyst/react-native-components";
import { AssetType } from "module/wallet/wallet.types";
import { NftToken, Token } from "near-peersyst-sdk";

export type WalletAssetSelectProps = FormControlledComponentProps<CoreFormControlledComponentProps<Asset | undefined, LabelProps>> & {
    index: number;
};

export interface Asset {
    type: AssetType;
    nft?: NftToken;
    ft?: Token;
}
