import { ReceiveIcon, SendIcon } from "icons";
import { Transaction } from "module/transaction/types";
import useGetBalance from "module/wallet/query/useGetBalance";
import TransactionCard from "../TransactionCard/TransactionCard";
import { TransactionCardBalanceProps } from "../TransactionCard/TransactionCard.types";

const tokens = ["CKB", "CKB", "CKB", "ETH", "USDC", "TAI", "CKB", "CKB", "COOP", "CKB"];

export type TransactionCardProps = Transaction;

const MainTransactionCard = (transaction: TransactionCardProps): JSX.Element => {
    const seed = Math.random();
    const received = seed > 0.5;
    const token = tokens[Math.trunc(seed * 10)];
    const TxIcon = received ? <ReceiveIcon /> : <SendIcon />;
    const { data: mainBalance } = useGetBalance();
    
    const topBalance:TransactionCardBalanceProps = {
        balance: transaction.amount,
        units: token,
        boldUnits: true
    }
    const bottomBalance:TransactionCardBalanceProps = {
        balance: mainBalance?.freeBalance || 0,
        units: token,
    }
    return (
        <TransactionCard
            topBalance={topBalance}
            bottomBalance={bottomBalance}
            label={received ? "Received" : "Send"}
            TxIcon={TxIcon}
            {...transaction}
        />
    );
};

export default MainTransactionCard;
