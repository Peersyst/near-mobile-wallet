import { ImageProps } from "@peersyst/react-native-components";
import { placeholder_image } from "images";
import { NftImageRoot } from "./NftImage.styles";

export interface NftImageProps extends Omit<ImageProps, "source"> {
    uri?: string | null;
}

const NftImage = ({ uri }: NftImageProps) => {
    return (
        <NftImageRoot
            fallback={placeholder_image}
            source={{
                uri: uri ?? placeholder_image,
            }}
        />
    );
};

export default NftImage;
