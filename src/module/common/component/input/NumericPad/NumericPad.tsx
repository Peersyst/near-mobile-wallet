import { useState } from "react";
import { Col } from "react-native-components";
import Keyboard from "../../layout/Keyboard/Keyboard";
import PasswordLayout, { ZeroToFour } from "../../layout/PasswordLayout/PasswordLayout";

const NumericPad = (): JSX.Element => {
    const [password, setPassword] = useState<string>("");
    const zeroToFour: ZeroToFour[] = [0, 1, 2, 3, 4];
    return (
        <Col gap={40} alignItems={"center"}>
            <PasswordLayout activated={zeroToFour[password.length]} />
            <Keyboard password={password} setPassword={setPassword} />
        </Col>
    );
};

export default NumericPad;
