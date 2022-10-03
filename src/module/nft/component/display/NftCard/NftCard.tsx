import { Col } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import Balance from "module/wallet/component/display/Balance/Balance";
import { useMemo } from "react";
import { NftCardImage, NftCardRoot } from "./NftCard.styles";
import { NftCardProps } from "./NftCard.types";

const NftCard = ({ contract_id, metadata: { title, media, copies }, token_id, last, events }: NftCardProps): JSX.Element => {
    const lastTransfer = useMemo(() => {
        return events.find((e) => e.type === "nft_transfer");
    }, [events]);
    return (
        <NftCardRoot last={last}>
            <NftCardImage source={{ uri: media ?? "" }} />
            <Col flex={1} justifyContent="center" gap="6.5%">
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
                            Bought for
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
        </NftCardRoot>
    );
};

export default NftCard;
