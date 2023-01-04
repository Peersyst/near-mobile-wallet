import { Col, Row } from "@peersyst/react-native-components";
import Container from "module/common/component/display/Container/Container";
import Typography, { TypographyProps } from "module/common/component/display/Typography/Typography";
import { useTranslate } from "module/common/hook/useTranslate";
import Fee from "module/transaction/component/display/Fee/Fee";
import Balance from "module/wallet/component/display/Balance/Balance";
import useGetBalance from "module/wallet/query/useGetBalance";
import { AssetType } from "module/wallet/wallet.types";
import { TouchableWithoutFeedback } from "react-native";
import { useAssetSelect } from "../hook/useAssetSelect";
import { ChevronDownIcon } from "./AssetSelectDisplay.styles";

export interface AssetSelectDisplayProps {
    onPress: () => void;
}

export type AssetValueDisplayProps = Omit<TypographyProps, "children">;

export const AssetValueDisplay = ({ ...rest }: AssetValueDisplayProps): JSX.Element => {
    const { index, asset } = useAssetSelect();
    const { data: { available } = { available: "0" } } = useGetBalance(index);
    const { type, nft, ft } = asset ?? {};
    switch (type) {
        case AssetType.NFT:
            return (
                <Typography numberOfLines={1} {...rest}>
                    {nft?.metadata.title}
                </Typography>
            );
        case AssetType.FT:
            return <Balance units={ft?.metadata.symbol} balance={ft?.balance ?? "0"} {...rest} />;
        default:
            return <Balance units="token" balance={available} {...rest} />;
    }
};

const AssetSelectDisplay = ({ onPress }: AssetSelectDisplayProps) => {
    const translate = useTranslate();
    const { asset } = useAssetSelect();
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Container>
                <Col alignItems="center" flex={1} gap="2%">
                    <Row alignItems="center" gap={5} justifyContent="center" style={{ maxWidth: "100%" }}>
                        {asset ? (
                            <AssetValueDisplay variant="h4Strong" />
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
