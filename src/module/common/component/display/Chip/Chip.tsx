import { ChipProps } from "./Chip.types";
import { ChipStyles, ChipRoot, ChipText } from "./Chip.styles";
import { TouchableWithoutFeedback } from "react-native";

const Chip = ({ label, variant = "light", style, labelStyle, fullWidth, onPress }: ChipProps): JSX.Element => {
    return (
        <TouchableWithoutFeedback onPress={onPress} accessibilityRole={onPress ? "button" : "text"}>
            <ChipRoot variant={variant} testID="chipRoot" style={[style, !fullWidth && ChipStyles.notFullWidth]}>
                <ChipText variant={variant} style={labelStyle}>
                    {label}
                </ChipText>
            </ChipRoot>
        </TouchableWithoutFeedback>
    );
};

export default Chip;
