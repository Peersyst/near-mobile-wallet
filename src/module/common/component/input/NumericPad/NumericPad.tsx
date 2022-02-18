import { useAuth } from "module/auth/hook/useAuth";
import { useLogin } from "module/auth/query/useLogin";
import { useState } from "react";
import { Alert, View } from "react-native";
import { Col } from "react-native-components";
import PasswordLayout, { ZeroToFour } from "../../layout/PasswordLayout/PasswordLayout";
import PadItem from "../PadItem/PadItem";
import { PadItemType, zeroToNine } from "../PadItem/PadItem.types";
import { Keyboard } from "./NumericPad.styles";

const NumericPad = (): JSX.Element => {
    const [password, setPassword] = useState<string>("");
    const zeroToFour: ZeroToFour[] = [0, 1, 2, 3, 4];
    const login = useLogin();
    const {
        state: { isLogged },
    } = useAuth();
    const hadleClick = async (item: PadItemType) => {
        switch (item) {
            case "X":
                setPassword("");
                return;
            case "<":
                if (password.length != 0) setPassword(password.slice(0, -1));
                return;
            default:
                setPassword(password + item);
                if (password.length === 3) {
                    //TODO: check pw
                    try {
                        await login.mutate({ username: "Charlie", password: password });
                        {login.isSuccess ? Alert.alert("Password"): Alert.alert("Password incorrect")}
                    } catch (err) {
                        Alert.alert("Network error")
                    }
                    setPassword("")
                }
                return;
        }
    };

    return (
        <Col gap={40}>
            <View style={{ alignItems: "center" }}>
                <PasswordLayout activated={zeroToFour[password.length]} />
            </View>
            <Keyboard>
                {zeroToNine.map((num) => {
                    return num !== "0" && <PadItem onPress={() => hadleClick(num)} key={num} item={num} />;
                })}
                <PadItem item={"X"} onPress={() => hadleClick("X")} />
                <PadItem item={"0"} onPress={() => hadleClick("0")} />
                <PadItem item={"<"} onPress={() => hadleClick("<")} />
            </Keyboard>
        </Col>
    );
};

export default NumericPad;
