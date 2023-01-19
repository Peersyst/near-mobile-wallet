import { useTheme } from "@peersyst/react-native-styled";
import { TouchableHighlight } from "react-native";
import ValidatorInformation from "../../../display/ValidatorInformation/ValidatorInformation";
import { Validator } from "near-peersyst-sdk";
import { useValidatorSelect } from "../hook/useValidatorSelect";

export interface StakingListItemProps {
    validator: Validator;
}
const StakingListItemSelect = ({ validator }: StakingListItemProps): JSX.Element => {
    const { palette } = useTheme();
    const { setSelectedValidator } = useValidatorSelect();
    return (
        <TouchableHighlight activeOpacity={0.6} underlayColor={palette.gray["100"]} onPress={() => setSelectedValidator(validator)}>
            <ValidatorInformation validator={validator} />
        </TouchableHighlight>
    );
};

export default StakingListItemSelect;
