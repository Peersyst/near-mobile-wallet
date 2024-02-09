import { default_token, placeholder_image } from "images";
import { Token } from "near-peersyst-sdk";
import { ImageSourcePropType } from "react-native";
import { SUPPORTED_TOKENS_IMAGES } from "../SupportedTokens";

function getSupportedTokenImage(symbol = ""): ImageSourcePropType | undefined {
    if (!symbol) return;
    return SUPPORTED_TOKENS_IMAGES[symbol as keyof typeof SUPPORTED_TOKENS_IMAGES];
}

export const useGetSupportedTokenImageSource = (token: Token | undefined, isNativeToken: boolean): ImageSourcePropType | undefined => {
    const symbol = token?.metadata.symbol;
    if (isNativeToken) return placeholder_image;
    const image = getSupportedTokenImage(symbol);
    if (image) return image;
    return default_token;
};
