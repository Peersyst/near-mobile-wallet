import { Transaction, TransactionType } from "module/transaction/types";
import { DAODepositIcon, DAOWithdrawIcon, ReceiveIcon, SendIcon, SmartContractIcon, UnlockDAOIcon } from "icons";

export interface TransactionIconProps {
    type: Transaction["type"];
}

const DAO_TX_ICON_SIZE = 31;
const MAIN_TX_ICON_SIZE = 29;

const TransactionIcon = ({ type }: TransactionIconProps): JSX.Element => {
    switch (type) {
        case TransactionType.SEND_CKB:
        case TransactionType.SEND_NFT:
        case TransactionType.SEND_TOKEN:
            return <SendIcon style={{ fontSize: MAIN_TX_ICON_SIZE }} />;
        case TransactionType.RECEIVE_CKB:
        case TransactionType.RECEIVE_NFT:
        case TransactionType.RECEIVE_TOKEN:
            return <ReceiveIcon style={{ fontSize: MAIN_TX_ICON_SIZE }} />;
        case TransactionType.DEPOSIT_DAO:
            return <DAODepositIcon style={{ fontSize: DAO_TX_ICON_SIZE }} />;
        case TransactionType.WITHDRAW_DAO:
            return <DAOWithdrawIcon style={{ fontSize: DAO_TX_ICON_SIZE }} />;
        case TransactionType.SMART_CONTRACT:
            return <SmartContractIcon style={{ fontSize: MAIN_TX_ICON_SIZE }} />;
        case TransactionType.UNLOCK_DAO:
            return <UnlockDAOIcon />;
    }
};

export default TransactionIcon;
