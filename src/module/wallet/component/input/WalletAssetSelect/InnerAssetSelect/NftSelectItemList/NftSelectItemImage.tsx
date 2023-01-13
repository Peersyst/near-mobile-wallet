import NftImage, { NftImageProps } from "module/nft/component/display/NftImage/NftImage";
import { memo } from "react";

// eslint-disable-next-line react/display-name
export const NftSelectItemImage = memo((props: NftImageProps) => {
    return <NftImage {...props} style={{ height: 72, width: 72, borderRadius: 8 }} />;
});
