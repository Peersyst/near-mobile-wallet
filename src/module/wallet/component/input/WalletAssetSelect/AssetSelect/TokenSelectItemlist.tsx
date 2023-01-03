import useGetTokens from "module/token/query/useGetTokens";
import { Token } from "near-peersyst-sdk";
import BaseTokenSelectItem from "./BaseTokenSelectItem";

export const TokenSelectItem = ({ balance = "0", metadata }: Token) => {
    const { symbol, icon } = metadata;
    return <BaseTokenSelectItem units={symbol} balance={balance} icon={icon} />;
};

const TokenSelectItemlist = (): JSX.Element => {
    const { data: tokens = [] } = useGetTokens(2);
    return <>{tokens.length > 0 && tokens.map((token) => <TokenSelectItem key={token.metadata.symbol} {...token} />)}</>;
};

export default TokenSelectItemlist;
