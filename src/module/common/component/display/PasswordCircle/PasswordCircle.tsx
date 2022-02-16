import { CircleIcon, FilledCircleIcon } from "icons";

export interface PasswordCircleProps {
    active?: boolean;
}

const PasswordCircle = ({ active = true }: PasswordCircleProps): JSX.Element => {
    return <FilledCircleIcon style={{color: 'black'}} />;
};

export default PasswordCircle;
