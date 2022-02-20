import PasswordCircle from "../../display/PasswordCircle/PasswordCircle";
import { PasswordLayoutRoot } from "./PasswordLayout.styles";

export type ZeroToFourType = 0 | 1 | 2 | 3 | 4;

export interface NumActivedPasswords {
    activated: ZeroToFourType;
    error?: boolean;
}

const PasswordLayout = ({ activated, error }: NumActivedPasswords): JSX.Element => {
    return (
        <PasswordLayoutRoot>
            {/* {[...Array(4)].map((_, i) => {
                return <PasswordCircle error={error} height={-10-2*i} delay={-20+i*3} key={i} active={i < activated} />;
            })} */}
            <PasswordCircle error={error} height={-6} delay={0} duration={120} active={activated >= 1} />
            <PasswordCircle error={error} height={-6} delay={0} duration={130} active={activated >= 2} />
            <PasswordCircle error={error} height={-6} delay={0} duration={90} active={activated >= 3} />
            <PasswordCircle error={error} height={-6} delay={0} duration={60} active={activated >= 4} />
        </PasswordLayoutRoot>
    );
};

export default PasswordLayout;
