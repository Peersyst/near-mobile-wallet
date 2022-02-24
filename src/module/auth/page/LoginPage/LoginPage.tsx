import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { Alert, SafeAreaView, StatusBar } from "react-native";
import { useState } from "react";
import { translate } from "locale";
import BasePage from "module/common/component/layout/BasePage/BasePage";

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
        <BasePage appearance="dark" header={false}>
            <NumericPad onSubmit={handleSubmit} error={error} placeholder={translate("enter_your_pin")} />
        </BasePage>
    );
};

export default LoginPage;
