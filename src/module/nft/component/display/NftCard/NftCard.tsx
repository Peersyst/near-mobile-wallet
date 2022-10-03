import { Col } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import { useTranslate } from "module/common/hook/useTranslate";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import { TOKEN_PLACEHOLDER_IMAGES, ZeroToFive } from "module/token/component/display/TokenCard/utils/tokenImages";
import Balance from "module/wallet/component/display/Balance/Balance";
import { useMemo } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { NftCardImage } from "./NftCard.styles";
import { NftCardProps } from "./NftCard.types";

const NftCard = ({ nft, index }: NftCardProps): JSX.Element => {
    const t = useTranslate();
    const {
        contract_id,
        metadata: { title, media },
        events,
    } = nft;
    const lastTransfer = useMemo(() => {
        return events.find((e) => e.type === "nft_transfer");
    }, [events]);
    const imageIndex = (index % 6) as ZeroToFive;
    return (
        <TouchableWithoutFeedback>
            <MainListCard gap="6.5%">
                <NftCardImage source={media ? { uri: media } : TOKEN_PLACEHOLDER_IMAGES[imageIndex]} />
                <Col flex={1} justifyContent="center" gap="6%">
                    <Col gap={2}>
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
                    {lastTransfer && (
                        <Col>
                            <Typography variant="body4Strong" light numberOfLines={1}>
                                {t("boughtFor")}
                            </Typography>
                            <Balance
                                variant="body3Strong"
                                balance={lastTransfer.price}
                                options={{ maxDecimals: 2 }}
                                units="token"
                                numberOfLines={1}
                            />
                        </Col>
                    )}
                </Col>
            </MainListCard>
        </TouchableWithoutFeedback>
    );
};

export default NftCard;
