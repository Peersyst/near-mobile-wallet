import { useTheme } from "@peersyst/react-native-styled";
import { TouchableHighlight } from "react-native";
import ValidatorInformation from "../../../display/ValidatorInformation/ValidatorInformation";
import { useValidatorSelect } from "../hook/useValidatorSelect";
import { ValidatorInformationProps } from "module/staking/component/display/ValidatorInformation/ValidatorInformation.types";

export type StakingListItemProps = Pick<ValidatorInformationProps, "validator" | "stakingBalanceType">;

const StakingListItemSelect = ({ validator, ...rest }: StakingListItemProps): JSX.Element => {
    const { palette } = useTheme();
    const { setSelectedValidator } = useValidatorSelect();
    return (
        <TouchableHighlight activeOpacity={0.6} underlayColor={palette.gray["100"]} onPress={() => setSelectedValidator(validator)}>
            <ValidatorInformation validator={validator} {...rest} />
        </TouchableHighlight>
    );
};

export default StakingListItemSelect;
