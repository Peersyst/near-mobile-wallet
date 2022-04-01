import { DAODepositIcon, DAOWithdrawIcon } from "icons";
import { Icon } from "react-native-components";

interface DaoTransactionIconProps {
    isDeposit: boolean;
}
const DAO_TX_ICON_SIZE = 30;

const DaoTransactionIcon = ({ isDeposit }: DaoTransactionIconProps): JSX.Element => {
    return <Icon style={{ fontSize: DAO_TX_ICON_SIZE }}>{isDeposit ? <DAODepositIcon /> : <DAOWithdrawIcon />}</Icon>;
};

export default DaoTransactionIcon;
