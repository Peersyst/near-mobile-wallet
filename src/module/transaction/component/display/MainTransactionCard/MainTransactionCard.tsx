import { ReceiveIcon, SendIcon } from "icons";
import { Transaction } from "module/transaction/types";
import TransactionCard from "../TransactionCard/TransactionCard";

const tokens = ["CKB", "CKB", "CKB", "ETH", "USDC", "TAI", "CKB", "CKB", "COOP", "CKB"];

export type TransactionCardProps = Transaction;

const MainTransactionCard = (transaction: TransactionCardProps): JSX.Element => {
    const seed = Math.random();
    const received = seed > 0.5;
    const token = tokens[Math.trunc(seed * 10)];
    const TxIcon = received ? <ReceiveIcon /> : <SendIcon />;
    return <TransactionCard action={received ? "add" : "subtract"} label={received ? "received" : "send"} TxIcon={TxIcon} units={token} {...transaction} />;
};

export default MainTransactionCard;
