import { ImageProps } from "@peersyst/react-native-components";
import { placeholder_image } from "images";
import { toDataUrl } from "module/common/component/utils/blockImage";
import { NftImageRoot } from "./NftImage.styles";

export interface NftImageProps extends Omit<ImageProps, "source"> {
    uri?: string | null;
    tokenId?: string;
}

const NftImage = ({ uri, tokenId = "", ...rest }: NftImageProps) => {
    return (
        <NftImageRoot
            {...rest}
            fallback={placeholder_image}
            source={{
                uri: uri ?? toDataUrl(tokenId),
            }}
        />
    );
};

export default NftImage;
