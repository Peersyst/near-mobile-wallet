import { Token } from "near-peersyst-sdk";
import { useGetSupportedTokenImageSource } from "./hooks/useGetSupportedTokenImageSource";
import { TokenIconRoot } from "./TokenIcon.styles";

export interface TokenSize {
    width: number;
    height: number;
}

export interface TokenIconProps extends Partial<TokenSize> {
    token?: Token;
    nativeToken?: boolean;
}

const TokenIcon = ({ height = 44, width = 44, token, nativeToken = false }: TokenIconProps) => {
    const source = useGetSupportedTokenImageSource(token, nativeToken);
    return <TokenIconRoot source={source} height={height} width={width} />;
};

export default TokenIcon;
