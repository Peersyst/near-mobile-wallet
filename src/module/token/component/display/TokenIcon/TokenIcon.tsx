import { placeholder_image } from "images";
import { TokenIconRoot } from "./TokenIcon.styles";
import { getTokenIconPublic, isTokenIconPublic } from "./TokenIconPublic";

export interface TokenSize {
    width: number;
    height: number;
}

export interface TokenIconProps extends Partial<TokenSize> {
    icon: string;
    symbol: string;
}

const TokenIcon = ({ height = 44, width = 44, symbol }: TokenIconProps) => {
    const sizeProps = { height, width };
    return <TokenIconRoot source={isTokenIconPublic(symbol) ? { uri: getTokenIconPublic(symbol) } : placeholder_image} {...sizeProps} />;
};

export default TokenIcon;
