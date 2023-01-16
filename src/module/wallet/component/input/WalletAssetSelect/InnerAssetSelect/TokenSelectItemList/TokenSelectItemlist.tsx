import useGetTokens from "module/token/query/useGetTokens";
import { useAssetSelect } from "../../hook/useAssetSelect";
import { TokenSelectItem } from "./TokenSelectItem";

const TokenSelectItemlist = (): JSX.Element => {
    const { index } = useAssetSelect();
    const { data: tokens = [] } = useGetTokens(index);
    return <>{tokens.length > 0 && tokens.map((token, index) => <TokenSelectItem key={index} token={token} />)}</>;
};

export default TokenSelectItemlist;
