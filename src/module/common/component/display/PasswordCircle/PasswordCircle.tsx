import { CircleIcon, FilledCircleIcon } from "icons";

export interface PasswordCircleProps {
    active?: boolean;
}

const PasswordCircle = ({ active = false }: PasswordCircleProps): JSX.Element => {
    return active ? <FilledCircleIcon color="white"/> : <CircleIcon color="white" />;
};

export default PasswordCircle;
