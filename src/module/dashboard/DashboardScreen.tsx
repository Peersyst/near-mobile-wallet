import { SafeAreaView } from "react-native";
import { translate } from "locale";
import {
    Col,
    Skeleton,
    Animated,
    Backdrop,
    useBackdrop,
    createBackdrop,
    createModal,
    Modal,
    useModal,
    Typography,
} from "react-native-components";
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
import { useState } from "react";

const CustomText = styled(Text)(({ theme }) => ({ color: theme.palette.text }));

const CustomView = styled(View)(({ theme }) => ({
    backgroundColor: lighten(theme.palette.gold, 0.5),
    height: 40,
    alignItems: "center",
    justifyContent: "center",
}));

const AnimatedButton = Animated.createAnimatedComponent.slide(Button, { direction: "left" });

const NewBackdrop = createBackdrop(Backdrop);
const NewModal = createModal(Modal);

const DashboardScreen = ({ navigation }: any): JSX.Element => {
    const login = useLogin();
    const {
        state: { token, isLogged },
        logout,
    } = useAuth();

    const [visible, setVisible] = useState(false);
    const { showBackdrop } = useBackdrop();
    const { showModal } = useModal();

    return (
        <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
            <Col gap={10} style={{ overflow: "hidden" }}>
                <Header showIcons />
                <Navbar back title="HOLA" />
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
                <TextField />
                <Skeleton>
                    <TextField style={{ backgroundColor: "red" }} />
                </Skeleton>
            </Col>
            <Button onPress={() => navigation.navigate("Login")}>Login</Button>
            <Button onPress={() => showBackdrop(NewBackdrop)}>Open Backdrop</Button>
            <Button onPress={() => showModal(NewModal, { children: <Typography variant="h1">HOLA</Typography>, animation: "from-bottom" })}>
                Open Modal
            </Button>
        </SafeAreaView>
    );
};

export default DashboardScreen;
