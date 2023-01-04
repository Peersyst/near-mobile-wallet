import { Col, Row } from "@peersyst/react-native-components";
import Container from "module/common/component/display/Container/Container";
import Typography from "module/common/component/display/Typography/Typography";
import { useTranslate } from "module/common/hook/useTranslate";
import Fee from "module/transaction/component/display/Fee/Fee";
import Balance from "module/wallet/component/display/Balance/Balance";
import useGetBalance from "module/wallet/query/useGetBalance";
import { AssetType } from "module/wallet/wallet.types";
import { TouchableWithoutFeedback } from "react-native";
import { Asset } from "../AssetSelect/AssetSelect.types";
import { ChevronDownIcon } from "./AssetSelectDisplay.styles";

export interface AssetSelectDisplayProps {
    onPress: () => void;
    asset: Asset | undefined;
    index: number;
}

export const AssetValueDisplay = ({ asset, index }: Omit<AssetSelectDisplayProps, "onPress">): JSX.Element => {
    const variant = "h4Strong";
    const { data: { available } = { available: "0" } } = useGetBalance(index);
    const { type, nft, ft } = asset ?? {};
    switch (type) {
        case AssetType.NFT:
            return (
                <Typography numberOfLines={1} variant={variant}>
                    {nft?.metadata.title}
                </Typography>
            );
        case AssetType.FT:
            return <Balance variant={variant} units={ft?.metadata.symbol} balance={ft?.balance ?? "0"} />;
        default:
            return <Balance variant={variant} units="token" balance={available} />;
    }
};

const AssetSelectDisplay = ({ onPress, asset, index }: AssetSelectDisplayProps) => {
    const translate = useTranslate();
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Container>
                <Col alignItems="center" flex={1} gap="2%">
                    <Row alignItems="center" gap={5} justifyContent="center" style={{ maxWidth: "100%" }}>
                        {asset ? (
                            <AssetValueDisplay index={index} asset={asset} />
                        ) : (
                            <Typography variant="h4Strong">{translate("select_asset")}</Typography>
                        )}
                        <ChevronDownIcon />
                    </Row>
                    <Fee tag="body2" />
                </Col>
            </Container>
        </TouchableWithoutFeedback>
    );
};

export default AssetSelectDisplay;
