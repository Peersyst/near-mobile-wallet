import { SafeAreaView } from "react-native";
import { translate } from "locale";
import { Col } from "react-native-components";
import { Text, View } from "react-native";
import { useLogin } from "module/auth/query/useLogin";
import { ArrowIcon } from "icons";
import { useAuth } from "module/auth/hook/useAuth";
import styled from "@peersyst/react-native-styled";
import { lighten } from "@peersyst/react-utils";
import Button from "module/common/component/input/Button/Button";
import TextField from "module/common/component/input/TextField/TextField";
import Header from "module/common/component/navigation/Header/Header";
import Navbar from "module/common/component/navigation/Navbar/Navbar";

const CustomText = styled(Text)(({ theme }) => ({ color: theme.palette.text }));

const CustomView = styled(View)(({ theme }) => ({
    backgroundColor: lighten(theme.palette.gold, 0.5),
    height: 40,
    alignItems: "center",
    justifyContent: "center",
}));

const DashboardScreen = ({ navigation }: any): JSX.Element => {
    const login = useLogin();
    const {
        state: { token, isLogged },
        logout,
    } = useAuth();
    return (
        <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
            <Col gap={10} style={{ overflow: "hidden" }}>
                <Header showIcons />
                <Navbar back title="HOLA" />
                <CustomView>
                    <CustomText>{translate("name")}</CustomText>
                </CustomView>
                <Button
                    appearance="dark"
                    leftIcon={<ArrowIcon />}
                    loading={login.isLoading}
                    onPress={() => (!isLogged ? login.mutate({ username: "Charlie", password: "Test1234" }) : logout())}
                >
                    {!isLogged ? <Text>Log in</Text> : <Text>Log out</Text>}
                </Button>
                <Text>Query result: {JSON.stringify(login.data)}</Text>
                <Text>Auth state: {JSON.stringify({ token: token || null, isLogged })}</Text>
                {login.error && <Text>{JSON.stringify(login.error)}</Text>}
                <TextField />
            </Col>
            <Button onPress={() => navigation.navigate("Login")}>Login</Button>
        </SafeAreaView>
    );
};

export default DashboardScreen;
