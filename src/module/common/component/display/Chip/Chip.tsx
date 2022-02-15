import { ChipProps } from "./Chip.types";
import { ChipRoot, ChipText } from "./Chip.styles";
import { TouchableWithoutFeedback } from "react-native";

const Chip = ({ label, appearance = "light", style, labelStyle, fullWidth, onPress }: ChipProps): JSX.Element => {
    return (
        <TouchableWithoutFeedback onPress={onPress} accessibilityRole={onPress ? "button" : "text"}>
            <ChipRoot appearance={appearance} fullWidth={fullWidth} testID="chipRoot" style={style}>
                <ChipText appearance={appearance} style={labelStyle}>
                    {label}
                </ChipText>
            </ChipRoot>
        </TouchableWithoutFeedback>
    );
};

export default Chip;
