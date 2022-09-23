import { FilledCircleIcon } from "icons";
import { PinItemRoot } from "./PinItem.styles";

export interface PasswordCircleProps {
    active?: boolean;
}

const PinItem = ({ active = true }: PasswordCircleProps): JSX.Element => {
    return <PinItemRoot active={active}>{<FilledCircleIcon />}</PinItemRoot>;
};

export default PinItem;
