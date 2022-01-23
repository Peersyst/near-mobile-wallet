import { SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { translate } from "locale";
import Button from "module/common/component/input/Button/Button";
import { Text } from "react-native";
import { useLogin } from "module/auth/query/useLogin";
import { ArrowIcon } from "icons";
import { useAuth } from "module/auth/hook/useAuth";

const CustomView = styled.View`
    height: 40px;
    align-items: center;
    justify-content: center;
`;
const CustomText = styled.Text`
    color: ${(p) => p.theme.palette.primary};
`;
const Spacer = styled.View`
    height: 20px;
`;

const DashboardScreen = (): JSX.Element => {
    const login = useLogin();
    const {
        state: { token, isLogged },
        logout,
    } = useAuth();

    return (
        <SafeAreaView>
            <CustomView
                css={`
                    background-color: blue;
                `}
            >
                <CustomText>{translate("name")}</CustomText>
            </CustomView>
            <ArrowIcon
                color="black"
                css={`
                    color: blue;
                    font-size: 30px;
                `}
            />
            <Spacer />
            <Button
                onPress={() => (!isLogged ? login.mutate({ username: "Charlie", password: "Test1234" }) : logout())}
                css={`
                    margin-top: 20px;
                `}
            >
                {!isLogged ? <Text>{login.isLoading ? "Loading..." : "Log in"}</Text> : <Text>Log out</Text>}
            </Button>
            <Text>Query result: {JSON.stringify(login.data)}</Text>
            <Text>Auth state: {JSON.stringify({ token: token || null, isLogged })}</Text>
            {login.error && (
                <Text
                    css={`
                        color: red;
                    `}
                >
                    {JSON.stringify(login.error)}
                </Text>
            )}
        </SafeAreaView>
    );
};

export default DashboardScreen;
