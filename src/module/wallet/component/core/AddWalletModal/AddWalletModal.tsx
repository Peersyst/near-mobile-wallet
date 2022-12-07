import { ExposedBackdropProps } from "@peersyst/react-native-components";
import { ReactNode, useState } from "react";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { AddWalletModalRoot } from "./AddWalletModal.styles";
import useImportWallets from "module/wallet/hook/useImportWallets";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";

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
    imported,
    ...rest
}: AddWalletModalProps): JSX.Element => {
    const [open, setOpen] = useState(true);
    const { reset: resetCreateWalletState } = useCreateWallet();

    const importWallet = useImportWallets();
    const { network } = useRecoilValue(settingsState);

    const handleClose = () => {
        setOpen(false);
        onClose?.();
    };

    const handleExited = () => {
        onExited?.();
        resetCreateWalletState();
    };

    const handleWalletCreation = async () => {
        //TODO: implement create wallet
        if (imported) {
            await importWallet(network);
        }
        handleClose();
    };

    return (
        <AddWalletModalRoot open={open} onClose={handleClose} navbar={{ back: true, title, onBack }} onExited={handleExited} {...rest}>
            {renderProps(handleWalletCreation)}
        </AddWalletModalRoot>
    );
};

export default AddWalletModal;
