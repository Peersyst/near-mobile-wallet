import { ImageSourcePropType } from "react-native";
import * as image from "../../../../../../asset/image";

//TODO: add supported tokens
export const TOKEN_IMAGES: Record<string, string> = {
    usd: "",
};

export type ZeroToFive = 0 | 1 | 2 | 3 | 4 | 5;

export const TOKEN_PLACEHOLDER_IMAGES: Record<ZeroToFive, ImageSourcePropType> = {
    "0": image.token_placeholder0,
    "1": image.token_placeholder1,
    "2": image.token_placeholder2,
    "3": image.token_placeholder3,
    "4": image.token_placeholder4,
    "5": image.token_placeholder5,
};
