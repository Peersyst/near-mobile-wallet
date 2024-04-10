import { useModal } from "@peersyst/react-native-components";
import UpdateRequiredModal from "module/common/component/feedback/UpdateRequiredModal/UpdateRequiredModal";

export interface UseUpdateAvailableModalReturn {
    showUpdateAvailableModal: () => void;
}

export default function useShowUpdateAvailableModal(): UseUpdateAvailableModalReturn {
    const { showModal } = useModal();

    const showUpdateAvailableModal = () => {
        showModal(UpdateRequiredModal);
    };

    return { showUpdateAvailableModal };
}
