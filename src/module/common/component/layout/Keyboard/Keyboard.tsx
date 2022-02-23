import { useLogin } from "module/auth/query/useLogin";
import { Dispatch, SetStateAction } from "react";
import { Alert } from "react-native";
import PadItem from "../../input/PadItem/PadItem";
import { PadItemType, zeroToNine } from "../../input/PadItem/PadItem.types";
import { KeyboardRoot } from "./Keyboard.styles";

export interface KeyboardProps {
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    setError: Dispatch<SetStateAction<boolean>>;
    error: boolean;
}

const Keyboard = ({ password, setPassword, setError, error }: KeyboardProps): JSX.Element => {
    const login = useLogin();

    const hadleClick = async (item: PadItemType) => {
        if (error) setError(false);
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
                    login.mutate({ username: "Charlie", password: password });
                    {
                        login.isSuccess ? Alert.alert("Password correct") : setError(true);
                    }
                    setPassword("");
                }
                return;
        }
    };

    return (
        <KeyboardRoot>
            {zeroToNine.map((num) => {
                return num !== "0" && <PadItem style={{ marginBottom: 14 }} onPress={() => hadleClick(num)} key={num} item={num} />;
            })}
            <PadItem item={"X"} onPress={() => hadleClick("X")} />
            <PadItem item={"0"} onPress={() => hadleClick("0")} />
            <PadItem item={"<"} onPress={() => hadleClick("<")} />
        </KeyboardRoot>
    );
};

export default Keyboard;
