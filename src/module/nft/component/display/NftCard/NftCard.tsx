import { Col } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import { TouchableWithoutFeedback } from "react-native";
import { NftCardProps } from "./NftCard.types";
import NftImage from "../NftImage/NftImage";
import { Fragment, memo, useState } from "react";
import useTranslate from "module/common/hook/useTranslate";
import NftDetailsModal from "../../core/NftDetailsModal/NftDetailsModal";

const NftCard = ({ nft }: NftCardProps): JSX.Element => {
    const t = useTranslate();
    const [open, setOpen] = useState(false);

    const {
        metadata: { title, media_url },
        collection_metadata,
        owner_id,
        token_id,
    } = nft;

    return (
        <Fragment>
            <TouchableWithoutFeedback onPress={() => setOpen(true)}>
                <MainListCard gap="6.5%" alignItems="center" flex={1}>
                    <NftImage uri={media_url} tokenId={token_id} />
                    <Col flex={1} gap={12} justifyContent="center">
                        <Col gap={2} flex={1} justifyContent="center">
                            {title && (
                                <Typography variant="body1Strong" numberOfLines={1}>
                                    {title}
                                </Typography>
                            )}
                            {owner_id && (
                                <Typography variant="body3Strong" numberOfLines={1} color="primary">
                                    {owner_id}
                                </Typography>
                            )}
                        </Col>
                        {collection_metadata && (
                            <Col flex={1} gap={2}>
                                <Typography variant="body4Strong" light numberOfLines={1}>
                                    {t("collection") + ":"}
                                </Typography>
                                <Typography variant="body4Strong" numberOfLines={1}>
                                    {collection_metadata.name}
                                </Typography>
                            </Col>
                        )}
                    </Col>
                </MainListCard>
            </TouchableWithoutFeedback>
            <NftDetailsModal nft={nft} open={open} onClose={() => setOpen(false)} />
        </Fragment>
    );
};

export default memo(NftCard);
