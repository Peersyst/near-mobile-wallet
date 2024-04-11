import { createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { NftToken } from "near-peersyst-sdk";
import NftDetailsModalHeader from "./NftDetailsModalHeader/NftDetailsModalHeader";
import NftDetailsModalContent from "./NftDetailsModalContent/NftDetailsModalContent";
import { useControlled } from "@peersyst/react-hooks";

export interface DetailsNftModalProps extends ExposedBackdropProps {
    nft: NftToken;
}

const NftDetailsModal = createBackdrop<DetailsNftModalProps>(({ nft, open: openProp, defaultOpen, onClose: onCloseProp, ...rest }) => {
    const [open, setOpen] = useControlled(defaultOpen, openProp, onCloseProp);

    const handleOnClose = () => {
        setOpen(false);
    };

    return (
        <CardNavigatorModal
            closable
            navbar={{
                back: true,
                title: <NftDetailsModalHeader owner={nft.owner_id} title={nft.metadata?.title} />,
                titlePosition: "left",
            }}
            open={open}
            onClose={handleOnClose}
            {...rest}
        >
            <NftDetailsModalContent nft={nft} onClose={handleOnClose} />
        </CardNavigatorModal>
    );
});

export default NftDetailsModal;
