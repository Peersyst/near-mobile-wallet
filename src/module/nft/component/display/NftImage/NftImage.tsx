import { ImageProps } from "@peersyst/react-native-components";
import { placeholder_image } from "images";
import { toDataUrl } from "module/common/component/utils/blockImage";
import { NftImageRoot } from "./NftImage.styles";

export enum NftImageSize {
    SMALL = "small",
    LARGE = "large",
}

export interface NftImageProps extends Omit<ImageProps, "source"> {
    uri?: string | null;
    tokenId?: string;
    size?: NftImageSize;
}

const NftImage = ({ uri, tokenId = "", size = NftImageSize.SMALL, ...rest }: NftImageProps) => {
    return (
        <NftImageRoot
            {...rest}
            fallback={placeholder_image}
            source={{
                uri: uri ?? toDataUrl(tokenId),
            }}
            size={size}
        />
    );
};

export default NftImage;
