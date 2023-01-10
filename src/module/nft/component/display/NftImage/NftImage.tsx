import { ImageProps } from "@peersyst/react-native-components";
import { placeholder_image } from "images";
import { memo } from "react";
import { NftImageRoot } from "./NftImage.styles";

export interface NftImageProps extends Omit<ImageProps, "source"> {
    uri?: string | null;
}

// eslint-disable-next-line react/display-name
const NftImage = memo(({ uri }: NftImageProps) => {
    return (
        <NftImageRoot
            fallback={placeholder_image}
            source={{
                uri: uri ?? placeholder_image,
            }}
        />
    );
});

export default NftImage;
