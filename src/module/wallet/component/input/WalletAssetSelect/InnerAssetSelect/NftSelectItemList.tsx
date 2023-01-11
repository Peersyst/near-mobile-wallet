import { Col } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import { useTranslate } from "module/common/hook/useTranslate";
import NftImage, { NftImageProps } from "module/nft/component/display/NftImage/NftImage";
import useGetNfts from "module/nft/query/useGetNfts";
import { AssetType } from "module/wallet/wallet.types";
import { NftToken } from "near-peersyst-sdk";
import BaseSelectItemCard from "./BaseSelectItemCard";
import { useAssetSelect } from "../hook/useAssetSelect";
import { memo } from "react";

export interface NftSelectItemProps {
    nft: NftToken;
}

// eslint-disable-next-line react/display-name
export const NftSelectItemImage = memo((props: NftImageProps) => {
    return <NftImage {...props} style={{ height: 72, width: 72, borderRadius: 8 }} />;
});

export const NftSelectItem = ({ nft }: NftSelectItemProps) => {
    const {
        metadata: { title, media_url },
    } = nft;
    const { setSelectedAsset } = useAssetSelect();
    const handleOnPress = () => {
        setSelectedAsset({
            type: AssetType.NFT,
            nft,
        });
    };
    return (
        <BaseSelectItemCard onPress={handleOnPress}>
            <NftSelectItemImage uri={media_url} />
            <Typography variant="body2Strong" numberOfLines={1}>
                {title}
            </Typography>
        </BaseSelectItemCard>
    );
};

const NftSelectItemList = (): JSX.Element => {
    const { index } = useAssetSelect();
    const { data: nfts = [] } = useGetNfts(index);
    const translate = useTranslate();
    return (
        <>
            {nfts.length > 0 && (
                <Col gap="3%">
                    <Typography variant="body2Strong" numberOfLines={1} light>
                        {translate("nfts")}
                    </Typography>
                    {nfts.map((nft, index) => (
                        <NftSelectItem nft={nft} key={index} />
                    ))}
                </Col>
            )}
        </>
    );
};

export default NftSelectItemList;
