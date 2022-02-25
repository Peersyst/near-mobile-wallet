import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { useState } from "react";
import { translate } from "locale";
import LogoPage from "../LogoPage/LogoPage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "stack-navigator";

const LoginPage = (): JSX.Element => {
    const [error, setError] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
    const handleSubmit = (pin: string) => {
        if (pin === "1234") {
            setError(false);
            navigation.navigate("Home");
        } else setError(true);
    };
    console.log("main", error);

    return (
        <LogoPage>
            <NumericPad
                onSubmit={handleSubmit}
                error={error}
                placeholder={translate("enter_your_pin")}
                style={{ height: "65%", gap: "5%" }}
            />
        </LogoPage>
    );
};

export default LoginPage;
