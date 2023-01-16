import Typography from "module/common/component/display/Typography/Typography";
import { AssetType } from "module/wallet/wallet.types";
import { NftToken } from "near-peersyst-sdk";
import SelectItemCard from "../SelectItemCard";
import { useAssetSelect } from "../../hook/useAssetSelect";
import { NftSelectItemImage } from "./NftSelectItemImage";

export interface NftSelectItemProps {
    nft: NftToken;
}

export const NftSelectItem = ({ nft }: NftSelectItemProps) => {
    const {
        metadata: { title, media_url },
        token_id,
    } = nft;
    const { setSelectedAsset } = useAssetSelect();
    const handleOnPress = () => {
        setSelectedAsset({
            type: AssetType.NFT,
            nft,
        });
    };
    return (
        <SelectItemCard onPress={handleOnPress}>
            <NftSelectItemImage uri={media_url} tokenId={token_id} />
            <Typography variant="body2Strong" numberOfLines={1}>
                {title}
            </Typography>
        </SelectItemCard>
    );
};
