import { Col } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import { useTranslate } from "module/common/hook/useTranslate";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import { TouchableWithoutFeedback } from "react-native";
import { NftCardProps } from "./NftCard.types";
import NftImage from "../NftImage/NftImage";

const NftCard = ({ nft }: NftCardProps): JSX.Element => {
    const t = useTranslate();
    const {
        metadata: { title, media_url },
        collection_metadata,
        owner_id,
    } = nft;
    return (
        <TouchableWithoutFeedback>
            <MainListCard gap="6.5%" alignItems="center">
                <NftImage uri={media_url} />
                <Col flex={1} gap={12} justifyContent="center">
                    <Col gap={2} flex={1} justifyContent="center">
                        {title && (
                            <Typography variant="body1Strong" numberOfLines={1}>
                                {title}
                            </Typography>
                        )}
                        {owner_id && (
                            <Typography variant="body3Strong" numberOfLines={1} color={(p) => p.primary}>
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
    );
};

export default NftCard;
