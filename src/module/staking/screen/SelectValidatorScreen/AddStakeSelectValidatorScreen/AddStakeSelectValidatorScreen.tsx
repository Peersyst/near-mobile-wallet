import SelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/SelectValidatorScreen";
import { useTranslate } from "module/common/hook/useTranslate";
import useGetAllValidators from "module/staking/query/useGetAllValidators";
import { useSetTab } from "@peersyst/react-native-components";

const AddStakeSelectValidatorScreen = (): JSX.Element => {
    const translate = useTranslate();
    const setTab useSetTab()

    const { data: validators, isLoading } = useGetAllValidators();



    return (
        <SelectValidatorScreen
            validators={validators!}
            loading={isLoading}
            message={translate("select_new_validator")}
            onSelected={() => undefined}
            withSearch
        />
    );
};

export default AddStakeSelectValidatorScreen;
