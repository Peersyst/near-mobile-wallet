import { ChipProps } from "./Chip.types";
import { ChipRoot, ChipText } from "./Chip.styles";
import { TouchableWithoutFeedback } from "react-native";
import { useMemo } from "react";
import { extractTextStyles } from "utils/extractTextStyles";

const Chip = ({ label, appearance = "light", style, fullWidth, onPress }: ChipProps): JSX.Element => {
    
    const [textStyles, rootStyles] = useMemo(() => extractTextStyles({ ...style }), [style]);
    
    return (
        <TouchableWithoutFeedback onPress={onPress} accessibilityRole={onPress ? "button" : "text"}>
            <ChipRoot appearance={appearance} fullWidth={fullWidth} testID="chipRoot" style={rootStyles}>
                <ChipText appearance={appearance} style={textStyles}>
                    {label}
                </ChipText>
            </ChipRoot>
        </TouchableWithoutFeedback>
    );
};

export default Chip;
