import { CircleIcon, FilledCircleIcon } from "icons";
import { StyledCircle } from "./PasswordCircle.styles";

export interface PasswordCircleProps {
    active?: boolean;
}

const PasswordCircle = ({ active = false }: PasswordCircleProps): JSX.Element => {
    return <StyledCircle>{active ? <FilledCircleIcon /> : <CircleIcon />}</StyledCircle>;
};

export default PasswordCircle;
