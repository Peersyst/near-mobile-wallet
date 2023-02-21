import { useModal, useSetTab } from "@peersyst/react-native-components";
import { useRecoilValue } from "recoil";
import stakeRecoilState from "module/staking/state/StakeState";
import AddStakeModal, { AddStakeScreens } from "module/staking/component/core/AddStakeModal/AddStakeModal";
import { useTranslate } from "module/common/hook/useTranslate";
import useAddStake from "module/staking/query/useAddStake";
import StakingConfirmScreen from "../StakingConfirmScreen";

const AddStakeConfirmScreen = () => {
    const { amount, validator } = useRecoilValue(stakeRecoilState);
    const setTab = useSetTab();
    const { mutate: addStake, isLoading, isError, isSuccess } = useAddStake();
    const translate = useTranslate();
    const { hideModal } = useModal();

    const handleAddStake = () => {
        addStake({ validatorId: validator.accountId, amount: amount });
    };

    const onExited = () => {
        setTab(AddStakeScreens.SUCCESS);
    };

    return (
        <StakingConfirmScreen
            displayFullDecimals
            onExited={onExited}
            sendTransaction={handleAddStake}
            isLoading={isLoading}
            isError={isError}
            label={translate("confirm_new_action_of", { action: "staking" })}
            isSuccess={isSuccess}
            onEditValidator={() => setTab(AddStakeScreens.SELECT_VALIDATOR)}
            onCancel={() => hideModal(AddStakeModal.id)}
        />
    );
};

export default AddStakeConfirmScreen;
