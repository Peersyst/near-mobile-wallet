import { Col, Typography, useModal } from "@peersyst/react-native-components";
import { NftToken } from "near-peersyst-sdk";
import NftImage, { NftImageSize } from "../../../display/NftImage/NftImage";
import useTranslate from "module/common/hook/useTranslate";
import { capitalize } from "@peersyst/react-utils";
import Button from "module/common/component/input/Button/Button";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import { AssetType } from "module/wallet/wallet.types";
import { ViewProps } from "react-native";
import { DetailsTokenModalCard } from "./DetailsNftModalContentProps.styles";

export interface DetailsNftModalContentProps extends ViewProps {
    nft: NftToken;
}

const DetailsNftModalContent = ({ nft, ...rest }: DetailsNftModalContentProps) => {
    const translate = useTranslate();
    const { showModal } = useModal();

    function handleOnTransferButtonPress(): void {
        showModal(SendModal, { defaultAsset: { type: AssetType.NFT, nft } });
    }

    return (
        <Col alignItems="center" gap={16} {...rest}>
            <NftImage uri={nft.metadata.media_url} tokenId={nft.token_id} size={NftImageSize.LARGE} />
            {nft.metadata.description && <Typography variant="body3Regular">{nft.metadata.description}</Typography>}
            <DetailsTokenModalCard>
                <Button variant="quaternary" size="lg" onPress={handleOnTransferButtonPress}>
                    {capitalize(translate("transfer"))}
                </Button>
            </DetailsTokenModalCard>
        </Col>
    );
};

export default DetailsNftModalContent;
