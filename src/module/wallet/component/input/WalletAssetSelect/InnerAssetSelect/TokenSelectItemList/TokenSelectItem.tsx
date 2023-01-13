import { AssetType } from "module/wallet/wallet.types";
import { Token } from "near-peersyst-sdk";
import { useAssetSelect } from "../../hook/useAssetSelect";
import BaseTokenSelectItem from "../BaseTokenSelectItem";

export interface TokenSelectItemProps {
    token: Token;
}

export const TokenSelectItem = ({ token }: TokenSelectItemProps) => {
    const { balance = "0", metadata } = token;
    const { symbol } = metadata;
    const { setSelectedAsset } = useAssetSelect();
    const handleOnPress = () => {
        setSelectedAsset({
            type: AssetType.FT,
            ft: token,
        });
    };

    return <BaseTokenSelectItem onPress={handleOnPress} units={symbol} balance={balance} token={token} />;
};
