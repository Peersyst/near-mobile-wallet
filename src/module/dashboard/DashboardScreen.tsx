import { translate } from "locale";
import { Col, Animated } from "react-native-components";
import { Text, View } from "react-native";
import { useLogin } from "module/auth/query/useLogin";
import { ArrowIcon } from "icons";
import { useAuth } from "module/auth/hook/useAuth";
import styled from "@peersyst/react-native-styled";
import { lighten } from "@peersyst/react-utils";
import Button from "module/common/component/input/Button/Button";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import { useState } from "react";

const CustomText = styled(Text)(({ theme }) => ({ color: theme.palette.text }));

const CustomView = styled(View)(({ theme }) => ({
    backgroundColor: lighten(theme.palette.gold, 0.5),
    height: 40,
    alignItems: "center",
    justifyContent: "center",
}));

const AnimatedButton = Animated.createAnimatedComponent.slide(Button, { direction: "left" });

const DashboardScreen = ({ navigation }: any): JSX.Element => {
    const login = useLogin();
    const {
        state: { token, isLogged },
        logout,
    } = useAuth();

    const [visible, setVisible] = useState(false);

    return (
        <BasePage appearance="light" showIcons>
            <Col gap={10}>
                <CustomView>
                    <CustomText>{translate("name")}</CustomText>
                </CustomView>
                <AnimatedButton
                    in={visible}
                    appearance="dark"
                    leftIcon={<ArrowIcon />}
                    loading={login.isLoading}
                    onPress={() => (!isLogged ? login.mutate({ username: "Charlie", password: "Test1234" }) : logout())}
                    duration={500}
                >
                    {!isLogged ? <Text>Log in</Text> : <Text>Log out</Text>}
                </AnimatedButton>
                <Button onPress={() => setVisible(!visible)}>Toggle visible</Button>
                <Text>Query result: {JSON.stringify(login.data)}</Text>
                <Text>Auth state: {JSON.stringify({ token: token || null, isLogged })}</Text>
                {login.error && <Text>{JSON.stringify(login.error)}</Text>}
            </Col>
            <Button onPress={() => navigation.navigate("Login")}>Login</Button>
        </BasePage>
    );
};

export default DashboardScreen;
