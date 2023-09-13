import { CommonModalComponentProps, ModalProps, useModal } from "@peersyst/react-native-components";
import { ComponentType } from "react";
import SignerMessageModal from "../containers/SignerMessageModal/SignerMessageModal";
import SignerRequestModal from "../containers/SignerRequestModal/SignerRequestModal";

type ModalWithId<T extends CommonModalComponentProps = CommonModalComponentProps> = ComponentType<T> & {
    id: string;
};

export enum SignerModalType {
    MESSAGE = "message",
    REQUEST = "request",
}

export interface SignerModalProps extends ModalProps {
    id: string;
}

export const SignerModals: Record<SignerModalType, ModalWithId<SignerModalProps>> = {
    [SignerModalType.MESSAGE]: SignerMessageModal,
    [SignerModalType.REQUEST]: SignerRequestModal,
};

export interface UseSignerModalReturn {
    showSignerModal: (type: SignerModalType, id: string) => void;
}

export default function useSignerModal(): UseSignerModalReturn {
    const { showModal } = useModal();

    const showSignerModal = (type: SignerModalType, id: string) => {
        showModal(SignerModals[type], { id });
    };

    return { showSignerModal };
}
