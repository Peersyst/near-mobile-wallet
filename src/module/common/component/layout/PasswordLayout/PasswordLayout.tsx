import { Row } from "react-native-components";
import PasswordCircle from "../../display/PasswordCircle/PasswordCircle";

export interface NumActivedPasswords {
    activated: 0 | 1 | 2 | 3 | 4;
}

const PasswordLayout = (): JSX.Element => {
    return (
        <Row>
            <PasswordCircle />
        </Row>
    );
};

export default PasswordLayout;
