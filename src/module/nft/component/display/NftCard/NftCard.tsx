import { Col } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import { useTranslate } from "module/common/hook/useTranslate";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import Balance from "module/wallet/component/display/Balance/Balance";
import { useMemo } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { NftCardImage } from "./NftCard.styles";
import { NftCardProps } from "./NftCard.types";
import { placeholder_image } from "images";

const NftCard = ({ nft }: NftCardProps): JSX.Element => {
    const t = useTranslate();
    const {
        contract_id,
        metadata: { title, media },
        events,
    } = nft;
    const lastTransfer = useMemo(() => {
        return events.find((e) => e.type === "nft_transfer");
    }, [events]);

    return (
        <TouchableWithoutFeedback>
            <MainListCard gap="6.5%">
                <NftCardImage source={media ? { uri: media } : placeholder_image} />
                <Col flex={1} gap={12} justifyContent="center">
                    <Col gap={2} flex={1}>
                        {title && (
                            <Typography variant="body1Strong" numberOfLines={1}>
                                {title}
                            </Typography>
                        )}
                        {contract_id && (
                            <Typography variant="body3Strong" numberOfLines={1} color={(p) => p.primary}>
                                {contract_id}
                            </Typography>
                        )}
                    </Col>
                    <Col flex={1}>
                        {lastTransfer && (
                            <Col gap={2}>
                                <Typography variant="body4Strong" light numberOfLines={1}>
                                    {t("boughtFor")}
                                </Typography>
                                <Balance variant="body3Strong" balance={lastTransfer.price} options={{ maxDecimals: 2 }} units="token" />
                            </Col>
                        )}
                    </Col>
                </Col>
            </MainListCard>
        </TouchableWithoutFeedback>
    );
};

export default NftCard;
