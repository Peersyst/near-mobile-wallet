import { ExposedBackdropProps } from "react-native-components";
import { ReactNode, useState } from "react";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";
import GlassNavigatorModal from "module/common/component/navigation/GlassNavigatorModal/GlassNavigatorModal";

export interface AddWalletModalProps extends ExposedBackdropProps {
    title: string;
    onBack?: () => void;
    children: (handleWalletCreation: () => Promise<void>) => ReactNode;
}

const AddWalletModal = ({ onExited, onClose, children: renderProps, title, onBack, ...rest }: AddWalletModalProps): JSX.Element => {
    const [open, setOpen] = useState(true);
    const {
        state: { mnemonic, name, colorIndex },
        reset: resetCreateWalletState,
    } = useCreateWallet();
    const { setState: setWalletState } = useWalletState();

    const handleClose = () => {
        setOpen(false);
        onClose?.();
    };

    const handleExited = () => {
        onExited?.();
        resetCreateWalletState();
    };

    const handleWalletCreation = async () => {
        const newWallet = await WalletStorage.addWallet({ name: name!, mnemonic: mnemonic!, colorIndex: colorIndex! });
        if (newWallet) {
            setWalletState((state) => ({
                ...state,
                wallets: [
                    ...state.wallets,
                    {
                        name: newWallet.name,
                        colorIndex: newWallet.colorIndex,
                        index: newWallet.index,
                        serviceInstance: new CkbServiceMock(newWallet.mnemonic),
                    },
                ],
            }));
        }
        handleClose();
    };

    return (
        <GlassNavigatorModal open={open} onClose={handleClose} navbar={{ back: true, title, onBack }} onExited={handleExited} {...rest}>
            {renderProps(handleWalletCreation)}
        </GlassNavigatorModal>
    );
};

export default AddWalletModal;
