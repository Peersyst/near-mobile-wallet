import { ChipRoot, ChipText } from "./Chip.styles";
import { TouchableWithoutFeedback } from "react-native";
import { useMemo } from "react";
import { extractTextStyles } from "utils/extractTextStyles";
import { ChipProps } from "./Chip.types";
import GradientChip from "./GradientChip/GradientChip";

const Chip = ({ label, variant = "outlined", size = "md", style, fullWidth, onPress }: ChipProps): JSX.Element => {
    const [textStyles, rootStyles] = useMemo(() => extractTextStyles({ ...style }), [style]);
    if (variant === "gradient") {
        return <GradientChip label={label} size={size} style={style} onPress={onPress} fullWidth={fullWidth} />;
    }
    return (
        <TouchableWithoutFeedback onPress={onPress} accessibilityRole={onPress ? "button" : "text"}>
            <ChipRoot variant={variant} fullWidth={fullWidth} testID="chipRoot" style={rootStyles} size={size}>
                <ChipText variant={variant} style={textStyles} size={size}>
                    {label}
                </ChipText>
            </ChipRoot>
        </TouchableWithoutFeedback>
    );
};

export default Chip;
