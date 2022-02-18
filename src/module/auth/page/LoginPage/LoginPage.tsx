import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { SafeAreaView, StatusBar } from "react-native";

const LoginPage = (): JSX.Element => {

    return (
        <SafeAreaView
            //Temporary styles to see the page
            style={{
                marginTop: StatusBar.currentHeight,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop:"57%",
                paddingHorizontal: 20,
                backgroundColor: "black",
                height: "100%",
            }}
        >
            <NumericPad />
        </SafeAreaView>
    );
};

export default LoginPage;
