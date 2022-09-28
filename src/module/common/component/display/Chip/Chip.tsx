import { ChipProps } from "./Chip.types";
import { ChipRoot, ChipText } from "./Chip.styles";
import { TouchableWithoutFeedback } from "react-native";
import { useMemo } from "react";
import { extractTextStyles } from "utils/extractTextStyles";

const Chip = ({ label, variant = "outlined", style, fullWidth, onPress }: ChipProps): JSX.Element => {
    const [textStyles, rootStyles] = useMemo(() => extractTextStyles({ ...style }), [style]);
    return (
        <TouchableWithoutFeedback onPress={onPress} accessibilityRole={onPress ? "button" : "text"}>
            <ChipRoot variant={variant} fullWidth={fullWidth} testID="chipRoot" style={rootStyles}>
                <ChipText variant={variant} style={textStyles}>
                    {label}
                </ChipText>
            </ChipRoot>
        </TouchableWithoutFeedback>
    );
};

export default Chip;
