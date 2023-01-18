import { createModal, ExposedBackdropProps, useSetTab } from "@peersyst/react-native-components";
import StakeModal, { ModalTabs } from "module/staking/component/core/StakeModal/StakeModal";
import { useTranslate } from "module/common/hook/useTranslate";
import SelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/SelectValidatorScreen";
import useGetStakingValidators from "module/staking/hook/useGetStakingValidators";

export enum UnstakeModalScreens {
    SELECT_VALIDATOR,
    SET_AMOUNT,
}

const UnstakeModal = createModal(({ ...rest }: ExposedBackdropProps): JSX.Element => {
    const translate = useTranslate();
    const setTab = useSetTab();

    const { stakingValidators } = useGetStakingValidators();

    const unstakeModalTabs: ModalTabs[] = [
        {
            title: translate("select_validator"),
            tabIndex: UnstakeModalScreens.SELECT_VALIDATOR,
            tabContent: (
                <SelectValidatorScreen
                    message={translate("select_unstake_validator")}
                    validators={stakingValidators}
                    loading={false}
                    onFinish={() => setTab(UnstakeModalScreens.SET_AMOUNT)}
                />
            ),
        },
    ];

    return <StakeModal tabs={unstakeModalTabs} {...rest} />;
});

export default UnstakeModal;
