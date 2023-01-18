import { useSetTab } from "@peersyst/react-native-components";
import { useRecoilState } from "recoil";
import stakeRecoilState from "module/staking/state/StakeState";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import useAddStake from "module/staking/query/useAddStake";
import ConfirmStakingScreen from "../ConfirmStakingScreen/ConfirmStakingScreen";
import { AddStakeScreens } from "module/staking/component/core/AddStakeModal/AddStakeModal";
import { useTranslate } from "module/common/hook/useTranslate";
import { useEffect } from "react";

const AddStakingScreen = () => {
    const [stakeState, setStakeState] = useRecoilState(stakeRecoilState);
    const { validator, amount } = stakeState;
    const setTab = useSetTab();
    const { index } = useSelectedWallet();
    const { mutate: addStake, isLoading, isError, isSuccess } = useAddStake(index);
    const translate = useTranslate();

    const handleAddStake = () => {
        console.log("llege aca");
        addStake({ validatorId: validator.accountId, amount: amount });
    };

    const onExited = () => {
        setTab(AddStakeScreens.SUCCESS);
    };

    useEffect(() => {
        setStakeState((oldState) => ({
            ...oldState,
            handleSubmit: handleAddStake,
            isError: isError,
            isLoading: isLoading,
            isSuccess: isSuccess,
            onExited: onExited,
            labelConfirm: translate("confirm_new_staking_of"),
        }));
    }, [amount]);

    return <ConfirmStakingScreen></ConfirmStakingScreen>;
};

export default AddStakingScreen;
