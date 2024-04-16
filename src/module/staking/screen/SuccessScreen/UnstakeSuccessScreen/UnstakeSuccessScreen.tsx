import { useModal } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import useTranslate from "module/common/hook/useTranslate";
import stakeState from "module/staking/state/StakeState";
import Balance from "module/wallet/component/display/Balance/Balance";
import { useRecoilValue } from "recoil";
import UnstakeModal from "module/staking/component/core/UnstakeModal/UnstakeModal";
import StakingSuccessScreen from "../StakingSuccessScreen";

const UnstakeSuccessScreen = () => {
    const translate = useTranslate();
    const { hideModal } = useModal();

    const { amount } = useRecoilValue(stakeState);

    function handleOnClose() {
        hideModal(UnstakeModal.id);
    }

    return (
        <StakingSuccessScreen
            message={
                <Typography color="status.success" variant="body3Regular">
                    <Balance color="status.success" variant="body3Strong" balance={amount!} units="token" />
                    {" " + translate("unstake_success")}
                </Typography>
            }
            onClose={handleOnClose}
        >
            <Typography variant="body3Strong" light textAlign="center">
                {translate("unstake_withdraw_waiting_time")}
            </Typography>
        </StakingSuccessScreen>
    );
};

export default UnstakeSuccessScreen;
