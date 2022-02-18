import PasswordCircle from "../../display/PasswordCircle/PasswordCircle";
import { PasswordLayoutRoot } from "./PasswordLayout.styles";

export type ZeroToFourType = 0 | 1 | 2 | 3 | 4;

export interface NumActivedPasswords {
    activated: ZeroToFourType;
}

const PasswordLayout = ({ activated }: NumActivedPasswords): JSX.Element => {
    return (
        <PasswordLayoutRoot>
            {[...Array(4)].map((_, i) => {
                return <PasswordCircle key={i} active={i < activated} />;
            })}
        </PasswordLayoutRoot>
    );
};

export default PasswordLayout;
