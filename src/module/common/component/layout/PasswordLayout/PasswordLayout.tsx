import { Row } from "react-native-components";
import PasswordCircle from "../../display/PasswordCircle/PasswordCircle";

export type ZeroToFour = 0 | 1 | 2 | 3 | 4;

export interface NumActivedPasswords {
    activated: ZeroToFour;
}

const PasswordLayout = ({ activated }: NumActivedPasswords): JSX.Element => {
    return (
        <Row gap={10}>
            {[...Array(4)].map((_, i) => {
                return <PasswordCircle key={i} active={i < activated} />;
            })}
        </Row>
    );
};

export default PasswordLayout;
