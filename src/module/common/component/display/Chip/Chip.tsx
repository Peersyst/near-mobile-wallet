import { ChipProps } from "./Chip.types";
import { ChipRoot, ChipText } from "./Chip.styles";
import { TouchableWithoutFeedback } from "react-native";

const Chip = ({ label, variant = "light", style, labelStyle, fullWidth, onPress }: ChipProps): JSX.Element => {
    return (
        <TouchableWithoutFeedback onPress={onPress} accessibilityRole={onPress ? "button" : "text"}>
            <ChipRoot variant={variant} fullWidth={fullWidth} testID="chipRoot" style={style}>
                <ChipText variant={variant} style={labelStyle}>
                    {label}
                </ChipText>
            </ChipRoot>
        </TouchableWithoutFeedback>
    );
};

export default Chip;
