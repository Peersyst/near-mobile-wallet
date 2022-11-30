import { ExposedBackdropProps } from "@peersyst/react-native-components";
import { ReactNode, useState } from "react";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";

export interface AddWalletModalProps extends ExposedBackdropProps {
    title: string;
    onBack?: () => void;
    children: (handleWalletCreation: () => Promise<void>) => ReactNode;
    imported?: boolean;
}

const AddWalletModal = ({
    onExited,
    onClose,
    children: renderProps,
    title,
    onBack,
    //imported,
    ...rest
}: AddWalletModalProps): JSX.Element => {
    const [open, setOpen] = useState(true);
    //TODO: implement add wallet modal
    const {
        //state: { privateKey, name, colorIndex },
        reset: resetCreateWalletState,
    } = useCreateWallet();
    //const { setState: setWalletState } = useWalletState();
    //const { network } = useRecoilValue(settingsState);
    const handleClose = () => {
        setOpen(false);
        onClose?.();
    };

    const handleExited = () => {
        onExited?.();
        resetCreateWalletState();
    };

    const handleWalletCreation = async () => {
        //TODO: implement wallet creation
        handleClose();
    };

    return (
        <CardNavigatorModal open={open} onClose={handleClose} navbar={{ back: true, title, onBack }} onExited={handleExited} {...rest}>
            {renderProps(handleWalletCreation)}
        </CardNavigatorModal>
    );
};

export default AddWalletModal;
