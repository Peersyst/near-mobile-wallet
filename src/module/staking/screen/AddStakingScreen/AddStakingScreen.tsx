import { useModal, useSetTab } from "@peersyst/react-native-components";
import { useRecoilValue } from "recoil";
import stakeRecoilState from "module/staking/state/StakeState";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import useAddStake from "module/staking/query/useAddStake";
import ConfirmStakingScreen from "../ConfirmStakingScreen/ConfirmStakingScreen";
import AddStakeModal, { AddStakeScreens } from "module/staking/component/core/AddStakeModal/AddStakeModal";
import { useTranslate } from "module/common/hook/useTranslate";

const AddStakingScreen = () => {
    const { amount, validator } = useRecoilValue(stakeRecoilState);
    const setTab = useSetTab();
    const { index } = useSelectedWallet();
    const { mutate: addStake, isLoading, isError, isSuccess } = useAddStake(index);
    const translate = useTranslate();
    const { hideModal } = useModal();

    const handleAddStake = () => {
        addStake({ validatorId: validator.accountId, amount: amount });
    };

    const onExited = () => {
        setTab(AddStakeScreens.SUCCESS);
    };

    return (
        <ConfirmStakingScreen
            onExited={onExited}
            sendTransaction={handleAddStake}
            isLoading={isLoading}
            isError={isError}
            label={translate("confirm_new_staking_of")}
            isSuccess={isSuccess}
            onEditValidator={() => setTab(AddStakeScreens.SELECT_VALIDATOR)}
            onCancel={() => hideModal(AddStakeModal.id)}
        />
    );
};

export default AddStakingScreen;
