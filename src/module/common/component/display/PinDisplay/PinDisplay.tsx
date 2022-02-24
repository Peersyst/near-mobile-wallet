import PinItem from "./PinItem/PinItem";
import { PinDisplayPlaceholder, PinDisplayRoot } from "./PinDisplay.styles";

export interface PinDisplayProps {
    length: number;
    placeholder?: string;
    error?: boolean;
}

const animationDuration: number[] = [60, 90, 130, 120];

const PinDisplay = ({ length, error, placeholder }: PinDisplayProps): JSX.Element => {
    return (
        <PinDisplayRoot>
            {length || !placeholder ? (
                [...Array(4)].map((_, i) => (
                    <PinItem error={error} animationHeight={-6} duration={animationDuration[i]} key={i} active={i < length} />
                ))
            ) : (
                <PinDisplayPlaceholder>{placeholder}</PinDisplayPlaceholder>
            )}
        </PinDisplayRoot>
    );
};

export default PinDisplay;
