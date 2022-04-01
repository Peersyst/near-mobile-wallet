import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import { Transaction } from "module/transaction/types";
import DaoTransactionIcon from "./DaoTransactionIcon";

export type TransactionCardProps = Transaction;

const DaoTransactionCard = (transaction: TransactionCardProps): JSX.Element => {
    const seed = new Date().getSeconds() / 30;
    const deposit = seed > 0.5;
    return (
        <TransactionCard
            action={deposit ? "display" : "add"}
            label={deposit ? "Deposit" : "Withdraw"}
            TxIcon={<DaoTransactionIcon isDeposit={deposit} />}
            units={"ckb"}
            {...transaction}
        />
    );
};

export default DaoTransactionCard;
