import { useTheme } from "@peersyst/react-native-styled";
import { TouchableHighlight } from "react-native";
import ValidatorInformation from "../../../display/ValidatorInformation/ValidatorInformation";
import { Validator } from "near-peersyst-sdk";

export interface StakingListItemProps {
    onSelected: (validator: Validator) => void;
    validator: Validator;
}
const StakingListItemSelect = ({ validator, onSelected }: StakingListItemProps): JSX.Element => {
    const { palette } = useTheme();
    return (
        <TouchableHighlight activeOpacity={0.6} underlayColor={palette.gray["100"]} onPress={() => onSelected(validator)}>
            <ValidatorInformation validator={validator} />
        </TouchableHighlight>
    );
};

export default StakingListItemSelect;
