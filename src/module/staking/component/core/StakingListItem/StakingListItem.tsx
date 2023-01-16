import { useTheme } from "@peersyst/react-native-styled";
import { StakingValidator } from "module/staking/hook/useGetStakingValidators";
import { TouchableHighlight } from "react-native";
import ValidatorInformation from "../ValidatorInformation/ValidatorInformation";

export interface StakingListItemProps {
    onSelected: (validator: StakingValidator) => void;
    validator: StakingValidator;
}
const StakingListItem = ({ validator, onSelected }: StakingListItemProps): JSX.Element => {
    const { palette } = useTheme();
    return (
        <TouchableHighlight activeOpacity={0.6} underlayColor={palette.gray["100"]} onPress={() => onSelected(validator)}>
            <ValidatorInformation validator={validator} />
        </TouchableHighlight>
    );
};

export default StakingListItem;
