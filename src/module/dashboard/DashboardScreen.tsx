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
import BasePage from "module/common/component/layout/BasePage/BasePage";

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
        <BasePage appearance="light" showIcons>
            <Button onPress={() => navigation.navigate("Login")}>Login</Button>
            <Button onPress={() => showBackdrop(NewBackdrop)}>Open Backdrop</Button>
            <Button onPress={() => showModal(NewModal, { children: <Typography variant="h1">HOLA</Typography>, animation: "from-bottom" })}>
                Open Modal
            </Button>
        </BasePage>
    );
};

export default DashboardScreen;
