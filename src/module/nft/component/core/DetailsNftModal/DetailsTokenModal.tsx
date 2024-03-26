import { createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { NftToken } from "near-peersyst-sdk";
import DetailsNftModalHeader from "./DetailsNftModalHeader/DetailsNftModalHeader";
import DetailsNftModalContent from "./DetailsNftModalContent/DetailsNftModalContent";

export interface DetailsNftModalProps extends ExposedBackdropProps {
    nft: NftToken;
}

const DetailsNftModal = createBackdrop<DetailsNftModalProps>(({ nft, ...rest }) => {
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
            <DetailsNftModalContent nft={nft} />
        </CardNavigatorModal>
    );
});

export default DetailsNftModal;
