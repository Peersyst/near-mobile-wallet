import { useModal } from "@peersyst/react-native-components";
import AddNearModal from "module/transaction/component/core/AddNearModal/AddNearModal";

export interface UseUpdateAvailableModalReturn {
    showUpdateAvailableModal: () => void;
}

export default function useShowUpdateAvailableModal(): UseUpdateAvailableModalReturn {
    const { showModal } = useModal();

    const showUpdateAvailableModal = () => {
        showModal(AddNearModal);
    };

    return { showUpdateAvailableModal };
}
