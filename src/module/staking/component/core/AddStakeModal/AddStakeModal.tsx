import { createBackdrop, ExposedBackdropProps, useSetTab } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import { TransaltionResourceType } from "locale";
import SelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/SelectValidatorScreen";
import StakeModal, { ModalTabs } from "module/staking/component/core/StakeModal/StakeModal";
import useGetAllValidators from "module/staking/query/useGetAllValidators";

export enum AddStakeScreens {
    SELECT_VALIDATOR,
    SET_AMOUNT,
    CONFIRM_VALIDATOR,
}

const AddStakeModal = createBackdrop(({ ...rest }: ExposedBackdropProps) => {
    const translate = useTranslate();
    const setTab = useSetTab();
    const ADD_STAKE_MODAL_TITLES: TransaltionResourceType[] = ["stake_your_near", "select_validator", "confirm_validator", "success"];

    const { data: validators, isLoading } = useGetAllValidators();

    const addStakeModalTabs: ModalTabs[] = [
        {
            title: translate("select_validator"),
            tabIndex: AddStakeScreens.SELECT_VALIDATOR,
            tabContent: (
                <SelectValidatorScreen
                    message={translate("enter_new_validator")!}
                    validators={validators}
                    loading={isLoading}
                    onFinish={() => setTab(AddStakeScreens.SET_AMOUNT)}
                    withSearch
                />
            ),
        },
    ];

    return <StakeModal tabs={addStakeModalTabs} {...rest} />;
});

export default AddStakeModal;
