import { TouchableOpacity } from "react-native";
import ValidatorInformation from "../../../display/ValidatorInformation/ValidatorInformation";
import { useValidatorSelect } from "../hook/useValidatorSelect";
import { ValidatorInformationProps } from "module/staking/component/display/ValidatorInformation/ValidatorInformation.types";

export type StakingListItemProps = Pick<ValidatorInformationProps, "validator" | "stakingBalanceType">;

const StakingListItemSelect = ({ validator, ...rest }: StakingListItemProps): JSX.Element => {
    const { setSelectedValidator } = useValidatorSelect();

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={() => setSelectedValidator(validator)}>
            <ValidatorInformation validator={validator} {...rest} />
        </TouchableOpacity>
    );
};

export default StakingListItemSelect;
