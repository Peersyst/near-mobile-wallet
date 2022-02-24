import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { Alert, SafeAreaView, StatusBar } from "react-native";
import { useState } from "react";
import { translate } from "locale";

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
        <SafeAreaView
            //TODO: Remove this temporary styles to see the page
            style={{
                marginTop: StatusBar.currentHeight,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "57%",
                paddingHorizontal: 20,
                backgroundColor: "black",
                height: "100%",
            }}
        >
            <NumericPad onSubmit={handleSubmit} error={error} placeholder={translate("enter_your_pin")} />
        </SafeAreaView>
    );
};

export default LoginPage;
