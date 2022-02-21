import PasswordCircle from "../../display/PasswordCircle/PasswordCircle";
import { PasswordLayoutRoot } from "./PasswordLayout.styles";

export type ZeroToFourType = 0 | 1 | 2 | 3 | 4;

export interface NumActivedPasswords {
    activated: ZeroToFourType;
    error?: boolean;
}

const animationDuration: number[] = [60, 90, 130, 120];

const PasswordLayout = ({ activated, error }: NumActivedPasswords): JSX.Element => {
    return (
        <PasswordLayoutRoot>
            {[...Array(4)].map((_, i) => {
                return <PasswordCircle error={error} animationHeight={-6} duration={animationDuration[i]} key={i} active={i < activated} />;
            })}
        </PasswordLayoutRoot>
    );
};

export default PasswordLayout;
