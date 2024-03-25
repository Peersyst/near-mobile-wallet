import { Col, createBackdrop, ExposedBackdropProps, Typography, useModal } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { NftToken } from "near-peersyst-sdk";
import DetailsNftModalHeader from "./DetailsNftModalHeader/DetailsNftModalHeader";
import NftImage, { NftImageSize } from "../../display/NftImage/NftImage";
import useTranslate from "module/common/hook/useTranslate";
import { DetailsTokenModalContentButton } from "./DetailsTokenModal.styles";
import { capitalize } from "@peersyst/react-utils";
import Button from "module/common/component/input/Button/Button";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import { AssetType } from "module/wallet/wallet.types";

export interface DetailsNftModalProps extends ExposedBackdropProps {
    nft: NftToken;
}

const DetailsNftModal = createBackdrop<DetailsNftModalProps>(({ nft, ...rest }) => {
    const translate = useTranslate();
    const { showModal } = useModal();

    function handleOnTransferButtonPress(): void {
        showModal(SendModal, { defaultAsset: { type: AssetType.NFT, nft } });
    }

    return (
        <CardNavigatorModal
            closable
            navbar={{
                back: true,
                title: <DetailsNftModalHeader owner={nft.owner_id} title={nft.metadata?.title} />,
                titlePosition: "left",
            }}
            {...rest}
        >
            <Col alignItems="center" gap={16}>
                <NftImage uri={nft.metadata.media_url} tokenId={nft.token_id} size={NftImageSize.LARGE} />
                {nft.metadata.description && <Typography variant="body3Regular">{nft.metadata.description}</Typography>}
                <DetailsTokenModalContentButton>
                    <Button variant="quaternary" size="lg" onPress={handleOnTransferButtonPress}>
                        {capitalize(translate("transfer"))}
                    </Button>
                </DetailsTokenModalContentButton>
            </Col>
        </CardNavigatorModal>
    );
});

export default DetailsNftModal;
