import SelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/SelectValidatorScreen";
import { useTranslate } from "module/common/hook/useTranslate";
import useGetAllValidators from "module/staking/query/useGetAllValidators";
import { useSetTab } from "@peersyst/react-native-components";
import { AddStakeScreens } from "module/staking/component/core/AddStakeModal/AddStakeModal";

const AddStakeSelectValidatorScreen = (): JSX.Element => {
    const translate = useTranslate();
    const setTab = useSetTab();

    const { data: validators, isLoading } = useGetAllValidators();

    return (
        <SelectValidatorScreen
            validators={validators}
            loading={isLoading}
            message={translate("select_new_validator")}
            onSelected={() => setTab(AddStakeScreens.CONFIRM_VALIDATOR)}
            withSearch
        />
    );
};

export default AddStakeSelectValidatorScreen;
