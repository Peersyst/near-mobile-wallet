import { useToast } from "@peersyst/react-native-components";
import { useState } from "react";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { AddWalletModalContent, AddWalletModalRoot } from "./AddWalletModal.styles";
import useImportWallets from "module/wallet/hook/useImportWallets";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { useTranslate } from "module/common/hook/useTranslate";
import { AddWalletModalProps } from "./AddWalletModal.types";
import useCreateNewWallet from "module/wallet/hook/useCreateNewWallet";

const AddWalletModal = ({
    onExited,
    onClose,
    children: renderProps,
    title,
    onBack,
    imported,
    steps,
    closeOnWalletCreation = true,
    ...rest
}: AddWalletModalProps): JSX.Element => {
    const [open, setOpen] = useState(true);
    const { reset: resetCreateWalletState } = useCreateWallet();
    const importWallet = useImportWallets();
    const createNewWallet = useCreateNewWallet();
    const { network } = useRecoilValue(settingsState);
    const { showToast } = useToast();
    const translate = useTranslate();
    const translateError = useTranslate("error");

    const handleClose = () => {
        setOpen(false);
        onClose?.();
    };

    const handleExited = () => {
        onExited?.();
        resetCreateWalletState();
    };

    const handleWalletCreation = async () => {
        if (imported) {
            //Import wallet
            const wallets = await importWallet(network);
            if (wallets.length > 0) {
                showToast(translate("import_success" + (wallets.length === 1 ? "_one" : "_other")), { type: "success" });
            }
        } else {
            //Create wallet
            const wallet = await createNewWallet(network);
            if (!wallet) {
                showToast(translateError("error_creating_account"), { type: "error" });
                handleClose();
            }
        }
        if (closeOnWalletCreation) handleClose();
    };

    return (
        <AddWalletModalRoot
            open={open}
            onClose={handleClose}
            navbar={{ back: true, title, onBack, steps }}
            onExited={handleExited}
            {...rest}
        >
            <AddWalletModalContent steps={!!steps}>{renderProps(handleWalletCreation, handleClose)}</AddWalletModalContent>
        </AddWalletModalRoot>
    );
};

export default AddWalletModal;
