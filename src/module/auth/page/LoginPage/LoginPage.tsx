import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { Alert } from "react-native";
import { useState } from "react";
import { translate } from "locale";
import LogoPage from "../LogoPage/LogoPage";

const LoginPage = (): JSX.Element => {
    const [error, setError] = useState(false);
    const handleSubmit = (pin: string) => {
        if (pin === "1234") {
            setError(false);
            Alert.alert("Correct");
        } else setError(true);
    };
    console.log("main", error);

    return (
        <LogoPage>
            <NumericPad onSubmit={handleSubmit} error={error} placeholder={translate("enter_your_pin")} 
            style={{height:"60%"}}/>
        </LogoPage>
    );
};

export default LoginPage;
