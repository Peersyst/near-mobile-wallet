import SelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/SelectValidatorScreen";
import { useTranslate } from "module/common/hook/useTranslate";
import useGetAllValidators from "module/staking/query/useGetAllValidators";

const AddStakeValidatorScreen = (): JSX.Element => {
    const translate = useTranslate();

    const { data: validators, isLoading } = useGetAllValidators();

    return (
        <SelectValidatorScreen
            validators={validators}
            loading={isLoading}
            message={translate("select_new_validator")}
            onSelect={() => undefined}
            withSearch
        />
    );
};

export default AddStakeValidatorScreen;
