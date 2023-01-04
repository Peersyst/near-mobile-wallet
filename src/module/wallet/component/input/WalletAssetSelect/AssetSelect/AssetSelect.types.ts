import { CoreFormControlledComponentProps, FormControlledComponentProps, LabelProps } from "@peersyst/react-native-components";
import { AssetType } from "module/wallet/wallet.types";
import { NftToken, Token } from "near-peersyst-sdk";

export interface BaseAssetSelectProps {
    index: number;
}

export type AssetSelectProps = FormControlledComponentProps<CoreFormControlledComponentProps<Asset | undefined, LabelProps>> &
    BaseAssetSelectProps;

export interface Asset {
    type: AssetType;
    nft?: NftToken;
    ft?: Token;
}
