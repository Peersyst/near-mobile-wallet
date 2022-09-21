import { IconButton, IconButtonStyles, useModal } from "@peersyst/react-native-components";
import { EditIcon } from "icons";
import EditWalletModal from "module/wallet/component/core/EditWalletModal/EditWalletModal";

export interface EditWalletIconProps {
    index: number;
    style?: IconButtonStyles;
}

export const EditWalletIcon = ({ index, style }: EditWalletIconProps): JSX.Element => {
    const { showModal } = useModal();

    return (
        <IconButton style={style} onPress={() => showModal(EditWalletModal, { index })}>
            <EditIcon />
        </IconButton>
    );
};

export default EditWalletIcon;
