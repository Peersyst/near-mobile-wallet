import { Col, Typography, useModal } from "@peersyst/react-native-components";
import { NftToken } from "near-peersyst-sdk";
import { NftImageSize } from "../../../display/NftImage/NftImage";
import useTranslate from "module/common/hook/useTranslate";
import { capitalize } from "@peersyst/react-utils";
import Button from "module/common/component/input/Button/Button";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import { AssetType } from "module/wallet/wallet.types";
import { ViewProps } from "react-native";
import { NftDetailsModalContentImage } from "./NftDetailsModalContent.styles";
import Card from "module/common/component/surface/Card/Card";
import useHaveNearInAccount from "module/common/hook/useHaveNearInAccount";
import YouDontHaveNearCard from "module/wallet/component/display/YouDontHaveNearCard/YouDontHaveNearCard";

export interface NftDetailsModalContentProps extends ViewProps {
    nft: NftToken;
}

const NftDetailsModalContent = ({ nft, ...rest }: NftDetailsModalContentProps) => {
    const translate = useTranslate();
    const { showModal } = useModal();
    const haveNearInAccount = useHaveNearInAccount();

    function handleOnTransferButtonPress(): void {
        showModal(SendModal, { defaultAsset: { type: AssetType.NFT, nft } });
    }

    return (
        <Col alignItems="center" gap={16} {...rest}>
            <NftDetailsModalContentImage uri={nft.metadata.media_url} tokenId={nft.token_id} size={NftImageSize.LARGE} />
            {nft.metadata.description && <Typography variant="body3Regular">{nft.metadata.description}</Typography>}
            <Card>
                <Button variant="quaternary" size="lg" onPress={handleOnTransferButtonPress}>
                    {capitalize(translate("transfer"))}
                </Button>
            </Card>
            {!haveNearInAccount && <YouDontHaveNearCard />}
        </Col>
    );
};

export default NftDetailsModalContent;
