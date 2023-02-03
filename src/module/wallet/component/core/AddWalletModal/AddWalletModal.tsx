import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { AddWalletModalRoot } from "./AddWalletModal.styles";
import { AddWalletModalProps } from "./AddWalletModal.types";

const AddWalletModal = ({ onExited, children, ...rest }: AddWalletModalProps): JSX.Element => {
    const { reset: resetCreateWalletState } = useCreateWallet();

    const handleExited = () => {
        onExited?.();
        resetCreateWalletState();
    };

    return (
        <AddWalletModalRoot onExited={handleExited} {...rest}>
            {children}
        </AddWalletModalRoot>
    );
};

export default AddWalletModal;
