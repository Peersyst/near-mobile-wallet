import { ExposedBackdropProps } from "@peersyst/react-native-components";
import { ReactNode, useState } from "react";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { createServiceInstance } from "module/wallet/state/ServiceInstance/ServiceInstance";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";

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
    const {
        state: { privateKey, name, colorIndex },
        reset: resetCreateWalletState,
    } = useCreateWallet();
    const { setState: setWalletState } = useWalletState();
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
        const baseWallet = { colorIndex: colorIndex!, privateKey: privateKey!, imported, account: name! };
        const newWallet = await WalletStorage.addWallet(baseWallet, network);
        if (newWallet) {
            const finalWallet = { ...baseWallet, index: newWallet.index };
            await createServiceInstance({ nameId: name!, serviceIndex: newWallet.index, privateKey, network: network });
            setWalletState((state) => ({
                ...state,
                wallets: [...state.wallets, finalWallet],
            }));
        }
        handleClose();
    };

    return (
        <CardNavigatorModal open={open} onClose={handleClose} navbar={{ back: true, title, onBack }} onExited={handleExited} {...rest}>
            {renderProps(handleWalletCreation)}
        </CardNavigatorModal>
    );
};

export default AddWalletModal;
