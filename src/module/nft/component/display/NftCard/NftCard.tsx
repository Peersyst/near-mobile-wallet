import { Nft } from "ckb-peersyst-sdk";
import { Col, Typography } from "react-native-components";
import { NftCardImage, NftCardRoot } from "./NftCard.styles";
import { translate } from "locale";
import formatNumber from "utils/formatNumber";

export type NftCardProps = Nft;

const NftCard = ({ nftName, data }: NftCardProps): JSX.Element => (
    <NftCardRoot>
        <NftCardImage source={{ uri: data.imageUri }} />
        <Col flex={1} justifyContent="space-between" style={{ paddingVertical: 12 }}>
            <Col gap={6}>
                <Typography variant="body1" fontWeight="bold" numberOfLines={1}>
                    {nftName}
                </Typography>
                <Typography variant="body2" numberOfLines={1}>
                    {data.artist}
                </Typography>
            </Col>
            <Col gap={3} alignItems="flex-end">
                <Typography variant="caption" light>
                    {translate("bought_for")}:
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    {formatNumber(data.price || 0)} CKB
                </Typography>
            </Col>
        </Col>
    </NftCardRoot>
);

export default NftCard;
