import { createModal } from "@peersyst/react-native-components";
import { StakeModalRoot } from "module/staking/component/core/StakeModal/StakeModal.styles";

const StakeModal = createModal(() => {
    return <StakeModalRoot></StakeModalRoot>;
});

export default StakeModal;
