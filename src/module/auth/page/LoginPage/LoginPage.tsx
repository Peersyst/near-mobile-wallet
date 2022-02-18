import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { SafeAreaView, StatusBar } from "react-native";

const LoginPage = (): JSX.Element => {
    //const [password, setPassword] = useState("");

    return (
        <SafeAreaView
            style={{
                marginTop: StatusBar.currentHeight,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop:"57%",
                backgroundColor: "black",
                height: "100%",
            }}
        >
            <NumericPad />
        </SafeAreaView>
    );
};

export default LoginPage;
