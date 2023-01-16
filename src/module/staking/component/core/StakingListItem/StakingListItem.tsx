import { Validator } from "near-peersyst-sdk";
import { TouchableHighlight } from "react-native";
import ValidatorInformation from "../ValidatorInformation/ValidatorInformation";

export interface StakingListItemProps {
    onSelected: (validator: Validator) => void;
    validator: Validator;
}
const StakingListItem = ({ validator, onSelected }: StakingListItemProps): JSX.Element => {
    return (
        <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => onSelected(validator)}>
            <ValidatorInformation validator={validator} />
        </TouchableHighlight>
    );
};

export default StakingListItem;
