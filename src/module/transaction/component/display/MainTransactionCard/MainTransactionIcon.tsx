import { ReceiveIcon, SendIcon } from "icons";
import { Icon } from "react-native-components";

interface MainTransactionIconProps {
    received: boolean;
}
const MAIN_TX_ICON_SIZE = 28;

const MainTransactionIcon = ({ received }: MainTransactionIconProps): JSX.Element => {
    return <Icon style={{ fontSize: MAIN_TX_ICON_SIZE }}>{received ? <ReceiveIcon /> : <SendIcon />}</Icon>;
};

export default MainTransactionIcon;
