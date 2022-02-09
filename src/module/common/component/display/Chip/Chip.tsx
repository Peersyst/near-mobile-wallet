import { ChipProps } from "./Chip.types";
import { ChipRoot, ChipLabel, shadowStyle } from "./Chip.styles";

const Chip = ({ label, variant = "light", style}: ChipProps): JSX.Element => {
    return (
        <ChipRoot variant={variant} style={[
            shadowStyle.shadow, 
            style, 
            shadowStyle.innerWhiteShadow]}>
            <ChipLabel variant={variant}>{label}</ChipLabel>
        </ChipRoot>
    );
};

export default Chip;
