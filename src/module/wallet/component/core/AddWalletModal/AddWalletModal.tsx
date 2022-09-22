import { ExposedBackdropProps } from "@peersyst/react-native-components";
import { ReactNode, useState } from "react";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import MainNavigatorModal from "module/common/component/navigation/MainNavigatorModal/MainNavigatorModal";
import useServiceInstanceCreation from "module/wallet/hook/useServiceInstanceCreation";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";

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
    const createServiceInstance = useServiceInstanceCreation();
    const network = useSelectedNetwork();

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
                    },
                ],
            }));

            await createServiceInstance(newWallet.index, mnemonic!);

            //Use another thread
            setTimeout(async () => {
                await serviceInstancesMap.get(newWallet.index)?.[network]?.synchronize();
            });
        }
        handleClose();
    };

    return (
        <MainNavigatorModal
            scrollable={true}
            open={open}
            onClose={handleClose}
            navbar={{ back: true, title, onBack }}
            onExited={handleExited}
            {...rest}
        >
            {renderProps(handleWalletCreation)}
        </MainNavigatorModal>
    );
};

export default AddWalletModal;
