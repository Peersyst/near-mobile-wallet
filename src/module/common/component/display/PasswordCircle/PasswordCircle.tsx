import { CircleIcon, FilledCircleIcon } from "icons";
import { PasswordCircleRoot } from "./PasswordCircle.styles";

export interface PasswordCircleProps {
    active?: boolean;
}

const PasswordCircle = ({ active = true }: PasswordCircleProps): JSX.Element => {
    return <PasswordCircleRoot>{active ? <FilledCircleIcon /> : <CircleIcon />}</PasswordCircleRoot>;
};

export default PasswordCircle;
