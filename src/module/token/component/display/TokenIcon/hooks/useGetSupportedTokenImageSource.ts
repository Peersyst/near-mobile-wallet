import { placeholder_image } from "images";
import { toDataUrl } from "module/common/component/utils/blockImage";
import { Token } from "near-peersyst-sdk";
import { useRef } from "react";
import { ImageSourcePropType } from "react-native";
import { SUPPORTED_TOKENS_URLS } from "../SupportedTokens";

function getSupportedTokenUri(symbol: string): string | undefined {
    return SUPPORTED_TOKENS_URLS[symbol as keyof typeof SUPPORTED_TOKENS_URLS];
}

export const useGetSupportedTokenImageSource = (token: Token | undefined, isNativeToken: boolean): ImageSourcePropType | undefined => {
    const symbol = token?.metadata.symbol;
    const fallBackIcon = useRef(toDataUrl(token?.contractId || "contact_id")).current;
    if (isNativeToken) return placeholder_image;
    const uri = symbol ? getSupportedTokenUri(symbol) : undefined;
    if (uri) return { uri };
    return { uri: fallBackIcon };
};
