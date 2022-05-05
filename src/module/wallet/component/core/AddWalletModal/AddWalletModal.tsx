import { ExposedBackdropProps } from "react-native-components";
import { ReactNode, useState } from "react";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import GlassNavigatorModal from "module/common/component/navigation/GlassNavigatorModal/GlassNavigatorModal";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { WalletState } from "ckb-peersyst-sdk";

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
            if (!serviceInstancesMap.has(newWallet.index)) {
                serviceInstancesMap.set(
                    newWallet.index,
                    new CKBSDKService(newWallet.mnemonic.join(" "), newWallet.initialState, async (walletState: WalletState) => {
                        setWalletState((state) => ({
                            ...state,
                            wallets: state.wallets.map((w, idx) => (idx === newWallet.index ? { ...w, initialState: walletState } : w)),
                        }));
                        await WalletStorage.setInitialState(newWallet.index, walletState);
                    }),
                );
            }
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
            await serviceInstancesMap.get(newWallet.index)?.synchronize();
        }
        handleClose();
    };

    return (
        <GlassNavigatorModal
            scrollable={true}
            open={open}
            onClose={handleClose}
            navbar={{ back: true, title, onBack }}
            onExited={handleExited}
            {...rest}
        >
            {renderProps(handleWalletCreation)}
        </GlassNavigatorModal>
    );
};

export default AddWalletModal;
