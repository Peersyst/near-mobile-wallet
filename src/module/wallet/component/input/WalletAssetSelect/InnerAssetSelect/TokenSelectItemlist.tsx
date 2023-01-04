import useGetTokens from "module/token/query/useGetTokens";
import { AssetType } from "module/wallet/wallet.types";
import { Token } from "near-peersyst-sdk";
import BaseTokenSelectItem from "./BaseTokenSelectItem";
import { useAssetSelect } from "../hook/useAssetSelect";

export interface TokenSelectItemProps {
    token: Token;
}

export const TokenSelectItem = ({ token }: TokenSelectItemProps) => {
    const { balance = "0", metadata } = token;
    const { symbol, icon } = metadata;
    const { setSelectedAsset } = useAssetSelect();
    const handleOnPress = () => {
        setSelectedAsset({
            type: AssetType.FT,
            ft: token,
        });
    };
    return <BaseTokenSelectItem onPress={handleOnPress} units={symbol} balance={balance} icon={icon} />;
};

const TokenSelectItemlist = (): JSX.Element => {
    const { index } = useAssetSelect();
    const { data: tokens = [] } = useGetTokens(index);
    return <>{tokens.length > 0 && tokens.map((token, index) => <TokenSelectItem key={index} token={token} />)}</>;
};

export default TokenSelectItemlist;
