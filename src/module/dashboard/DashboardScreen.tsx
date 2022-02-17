import { SafeAreaView } from "react-native";
import { translate } from "locale";
import { Button, Col, TextField, TextArea, Form } from "react-native-components";
import { Text, View } from "react-native";
import { useLogin } from "module/auth/query/useLogin";
import { ArrowIcon, CrossIcon, BackIcon } from "icons";
import { useAuth } from "module/auth/hook/useAuth";
import styled from "@peersyst/react-native-styled";
import { lighten } from "@peersyst/react-utils";
import PadItem from "module/common/component/input/PadItem/PadItem";
import PasswordCircle from "module/common/component/display/PasswordCircle/PasswordCircle";

const CustomText = styled(Text)(({ theme }) => ({ color: theme.palette.text }));
const Spacer = styled(View)(() => ({ height: 20 }));

const CustomView = styled(View)(({ theme }) => ({
    backgroundColor: lighten(theme.palette.gold, 0.5),
    height: 40,
    alignItems: "center",
    justifyContent: "center",
}));

const DashboardScreen = ({navigation}: any): JSX.Element => {
    const login = useLogin();
    const {
        state: { token, isLogged },
        logout,
    } = useAuth();
    return (
        <SafeAreaView>
            <Col gap={10}>
                <CustomView>
                    <CustomText>{translate("name")}</CustomText>
                </CustomView>
                <ArrowIcon color="black" />
                <Spacer />
                <Button
                    leftIcon={<ArrowIcon />}
                    loading={login.isLoading}
                    onPress={() => (!isLogged ? login.mutate({ username: "Charlie", password: "Test1234" }) : logout())}
                >
                    {!isLogged ? <Text>Log in</Text> : <Text>Log out</Text>}
                </Button>

                <Text>Query result: {JSON.stringify(login.data)}</Text>
                <Text>Auth state: {JSON.stringify({ token: token || null, isLogged })}</Text>
                {login.error && <Text>{JSON.stringify(login.error)}</Text>}

                <Form onSubmit={(data) => console.log(data)}>
                    <Col gap={10}>
                        <TextField
                            name="input1"
                            style={{
                                input: { highlightColor: "green", textAlign: "center", color: "pink" },
                                invalid: { borderColor: "pink" },
                                focused: { borderColor: "orange", input: { color: "cyan" } },
                                disabled: { borderColor: "purple", input: { color: "red" } },
                            }}
                            validators="not-null|number"
                            prefix={<ArrowIcon />}
                            suffix={<ArrowIcon />}
                            clearable
                            secureTextEntry
                            disabled
                            value="Hola"
                        />
                        <TextArea
                            name="input2"
                            hint="Hi I'm a hint :D"
                            showValid
                            validators="not-null|number"
                            prefix={<ArrowIcon />}
                            suffix={<ArrowIcon />}
                        />
                        <Button fullWidth variant="outlined" style={{ outlined: { borderColor: "pink" } }}>
                            Submit
                        </Button>
                    </Col>
                </Form>
            </Col>
            <PadItem number={0} />
            <PasswordCircle active={true} />
            <Button onPress={() => navigation.navigate("Login")} >Login</Button>
        </SafeAreaView>
    );
};

export default DashboardScreen;
