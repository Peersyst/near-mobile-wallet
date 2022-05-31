import { Nft } from "ckb-peersyst-sdk";
import { Col, Typography } from "react-native-components";
import { NftCardImage, NftCardRoot } from "./NftCard.styles";

export type NftCardProps = Nft;

const NftCard = ({ nftName, tokenUri, tokenId, total }: NftCardProps): JSX.Element => (
    <NftCardRoot>
        <NftCardImage source={{ uri: tokenUri }} />
        <Col flex={1} justifyContent="space-between" style={{ paddingVertical: 12 }}>
            <Col gap={6}>
                <Typography variant="body1" fontWeight="bold" numberOfLines={1}>
                    {nftName}
                </Typography>
            </Col>
            {tokenId && total && (
                <Col alignItems="flex-end">
                    <Typography variant="body1" fontWeight="bold">
                        {`${tokenId}/${total}`}
                    </Typography>
                </Col>
            )}
        </Col>
    </NftCardRoot>
);

export default NftCard;
