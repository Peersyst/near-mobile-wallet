import { encodeSvg, isSvg } from "utils/svg";
import { SvgXml } from "react-native-svg";
import { placeholder_image } from "images";
import { TokenIconRoot } from "./TokenIcon.styles";

export interface TokenSize {
    width: number;
    height: number;
}

export interface TokenIconProps extends Partial<TokenSize> {
    icon: string;
}

const TokenIcon = ({ icon, height = 44, width = 44 }: TokenIconProps) => {
    const sizeProps = { height, width };
    return isSvg(icon) ? (
        <SvgXml xml={encodeSvg(icon)} {...sizeProps} />
    ) : (
        <TokenIconRoot source={icon ? { uri: icon } : placeholder_image} {...sizeProps} />
    );
};

export default TokenIcon;
