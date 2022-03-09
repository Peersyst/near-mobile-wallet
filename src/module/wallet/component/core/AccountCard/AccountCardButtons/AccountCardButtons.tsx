import { SendIcon, ReceiveIcon } from "icons";
import { Row } from "react-native-components";
import { CardButton, IconButton, Separator } from "./AccountCardButtons.style";

interface ActionButtonProps {
    action: "send" | "receive";
}
const ActionButton = ({ action }: ActionButtonProps): JSX.Element => {
    return <IconButton>{action === "send" ? <SendIcon /> : <ReceiveIcon />}</IconButton>;
};

const CardButtons = (): JSX.Element => {
    return (
        <Row justifyContent="center" style={{marginBottom:10}}>
            <CardButton position="left" leftIcon={<ActionButton action="send" />}>
                Send
            </CardButton>
            <Separator />
            <CardButton position="right" rightIcon={<ActionButton action="receive" />}>
                Receive
            </CardButton>
        </Row>
    );
};

export default CardButtons;
