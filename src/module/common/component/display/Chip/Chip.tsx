import { ChipProps } from "./Chip.types";
import { ChipStyles } from "./Chip.styles";
import { TouchableWithoutFeedback, View, Text } from "react-native";

const Chip = ({ label, variant = "light", style, fullWidth, onPress }: ChipProps): JSX.Element => {
    const { chipRoot, chipLabel, notFullWidth } = ChipStyles({ variant });
    return (
        <TouchableWithoutFeedback onPress={onPress} accessibilityRole={onPress ? "button" : "text"}>
            <View testID="chipRoot" style={[style, chipRoot, !fullWidth && notFullWidth]}>
                <Text style={[chipLabel]}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Chip;
