import { Transaction, TransactionType } from "@peersyst/ckb-peersyst-sdk";
import { DAODepositIcon, DAOWithdrawIcon, ReceiveIcon, SendIcon, SmartContractIcon, UnlockDaoIcon } from "icons";

export interface TransactionIconProps {
    type: Transaction["type"];
}

const TransactionIcon = ({ type }: TransactionIconProps): JSX.Element => {
    switch (type) {
        case TransactionType.SEND_CKB:
        case TransactionType.SEND_NFT:
        case TransactionType.SEND_TOKEN:
            return <SendIcon />;
        case TransactionType.RECEIVE_CKB:
        case TransactionType.RECEIVE_NFT:
        case TransactionType.RECEIVE_TOKEN:
            return <ReceiveIcon />;
        case TransactionType.DEPOSIT_DAO:
            return <DAODepositIcon />;
        case TransactionType.WITHDRAW_DAO:
            return <DAOWithdrawIcon />;
        case TransactionType.SMART_CONTRACT:
            return <SmartContractIcon />;
        case TransactionType.UNLOCK_DAO:
            return <UnlockDaoIcon />;
    }
};

export default TransactionIcon;
