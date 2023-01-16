import { createModal } from "@peersyst/react-native-components";
import { StakeModalRoot } from "module/staking/component/core/StakeModal/StakeModal.styles";

const UnstakeModal = createModal((): JSX.Element => {
    return <StakeModalRoot></StakeModalRoot>;
});

export default UnstakeModal;
