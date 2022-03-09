import { SendIcon, ReceiveIcon } from "icons";
import useNavigation from "module/common/hook/useNavigation";
import { MainScreens } from "module/main/MainNavigatorGroup";
import { Row } from "react-native-components";
import { CardButton, IconButton, Separator } from "./CardButtons.style";

interface ActionButtonProps {
    action: "send" | "receive";
}
const ActionButton = ({ action }: ActionButtonProps): JSX.Element => {
    return <IconButton>{action === "send" ? <SendIcon /> : <ReceiveIcon />}</IconButton>;
};

const CardButtons = (): JSX.Element => {
    const navigation = useNavigation();
    return (
        <Row justifyContent="center">
            <CardButton onPress={() => navigation.navigate(MainScreens.SEND)} position="left" leftIcon={<ActionButton action="send" />}>
                Send
            </CardButton>
            <Separator />
            <CardButton
                onPress={() => navigation.navigate(MainScreens.RECEIVE)}
                position="right"
                rightIcon={<ActionButton action="receive" />}
            >
                Receive
            </CardButton>
        </Row>
    );
};

export default CardButtons;
