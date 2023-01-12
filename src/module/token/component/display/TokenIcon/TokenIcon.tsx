import { placeholder_image } from "images";
import { toDataUrl } from "module/common/component/utils/blockImage";
import { Token } from "near-peersyst-sdk";
import { SUPPORTED_TOKENS } from "./SupportedTokens";
import { TokenIconRoot } from "./TokenIcon.styles";

export interface TokenSize {
    width: number;
    height: number;
}

export interface TokenIconProps extends Partial<TokenSize> {
    token?: Token;
    nativeToken?: boolean;
}

export function getSupportedTokenUri(symbol: string): string | undefined {
    return SUPPORTED_TOKENS[symbol as keyof typeof SUPPORTED_TOKENS];
}

const TokenIcon = ({ height = 44, width = 44, token, nativeToken }: TokenIconProps) => {
    const sizeProps = { height, width };
    const symbol = token?.metadata.symbol;
    const url = symbol ? getSupportedTokenUri(symbol) : undefined;
    return (
        <TokenIconRoot
            source={nativeToken ? placeholder_image : { uri: url ?? toDataUrl(token?.contractId || "contractId") }}
            {...sizeProps}
        />
    );
};

export default TokenIcon;
