import { placeholder_image } from "images";
import { SUPPORTED_TOKENS } from "./SupportedTokens";
import { TokenIconRoot } from "./TokenIcon.styles";

export interface TokenSize {
    width: number;
    height: number;
}

export interface TokenIconProps extends Partial<TokenSize> {
    units: string;
}

export function getSupportedTokenUri(symbol: string): string | undefined {
    return SUPPORTED_TOKENS[symbol as keyof typeof SUPPORTED_TOKENS];
}

const TokenIcon = ({ height = 44, width = 44, units }: TokenIconProps) => {
    const sizeProps = { height, width };
    const iconUri = getSupportedTokenUri(units);
    return <TokenIconRoot source={iconUri ? { uri: iconUri } : placeholder_image} {...sizeProps} />;
};

export default TokenIcon;
