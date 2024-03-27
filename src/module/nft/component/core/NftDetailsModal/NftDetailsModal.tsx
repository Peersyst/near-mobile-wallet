import { createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { NftToken } from "near-peersyst-sdk";
import NftDetailsModalHeader from "./NftDetailsModalHeader/NftDetailsModalHeader";
import NftDetailsModalContent from "./NftDetailsModalContent/NftDetailsModalContent";

export interface DetailsNftModalProps extends ExposedBackdropProps {
    nft: NftToken;
}

const NftDetailsModal = createBackdrop<DetailsNftModalProps>(({ nft, ...rest }) => {
    return (
        <CardNavigatorModal
            closable
            navbar={{
                back: true,
                title: <NftDetailsModalHeader owner={nft.owner_id} title={nft.metadata?.title} />,
                titlePosition: "left",
            }}
            {...rest}
        >
            <NftDetailsModalContent nft={nft} />
        </CardNavigatorModal>
    );
});

export default NftDetailsModal;
