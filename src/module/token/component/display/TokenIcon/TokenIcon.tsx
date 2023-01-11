import { placeholder_image } from "images";
import { TokenIconRoot } from "./TokenIcon.styles";
import { getTokenIconPublic } from "./TokenIconPublic";

export interface TokenSize {
    width: number;
    height: number;
}

export interface TokenIconProps extends Partial<TokenSize> {
    units: string;
}

const TokenIcon = ({ height = 44, width = 44, units }: TokenIconProps) => {
    const sizeProps = { height, width };
    const iconUri = getTokenIconPublic(units);
    return <TokenIconRoot source={iconUri ? { uri: iconUri } : placeholder_image} {...sizeProps} />;
};

export default TokenIcon;
