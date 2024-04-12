import { Col, Typography } from "@peersyst/react-native-components";
import { NftToken } from "near-peersyst-sdk";
import useTranslate from "module/common/hook/useTranslate";
import { capitalize } from "@peersyst/react-utils";
import Button from "module/common/component/input/Button/Button";
import { ViewProps } from "react-native";
import { NftDetailsModalContentImage } from "./NftDetailsModalContent.styles";
import Card from "module/common/component/surface/Card/Card";
import useHaveNearInAccount from "module/wallet/hook/useHaveNearInAccount";
import YouDontHaveNearCard from "module/wallet/component/display/YouDontHaveNearCard/YouDontHaveNearCard";

export interface NftDetailsModalContentProps extends ViewProps {
    nft: NftToken;
    onSend?: () => void;
}

const NftDetailsModalContent = ({ nft, onSend, ...rest }: NftDetailsModalContentProps) => {
    const translate = useTranslate();

    const haveNearInAccount = useHaveNearInAccount();

    return (
        <Col alignItems="center" gap="7%" {...rest}>
            <NftDetailsModalContentImage uri={nft.metadata.media_url} tokenId={nft.token_id} />
            {nft.metadata.description && (
                <Typography textAlign="left" variant="body3Regular">
                    {nft.metadata.description}
                </Typography>
            )}
            <Card variant="gray">
                <Button size="lg" variant="quaternary" onPress={onSend} disabled={!haveNearInAccount}>
                    {capitalize(translate("transfer"))}
                </Button>
            </Card>
            {!haveNearInAccount && <YouDontHaveNearCard />}
        </Col>
    );
};

export default NftDetailsModalContent;
