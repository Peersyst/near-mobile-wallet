import { useState } from "react";
import { Col } from "react-native-components";
import Keyboard from "../../layout/Keyboard/Keyboard";
import PasswordLayout, { ZeroToFourType } from "../../layout/PasswordLayout/PasswordLayout";

const NumericPad = (): JSX.Element => {
    const [password, setPassword] = useState<string>("");
    const [error,setError] = useState<boolean>(false);
    const zeroToFour: ZeroToFourType[] = [0, 1, 2, 3, 4];
    return (
        <Col gap={40} alignItems={"center"}>
            <PasswordLayout activated={zeroToFour[password.length]} error={error} />
            <Keyboard error={error} password={password} setPassword={setPassword} setError={setError}/>
        </Col>
    );
};

export default NumericPad;
