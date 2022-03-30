import { DAODepositIcon, DAOWithdrawIcon } from "icons";
import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import { Transaction } from "module/transaction/types";

export type TransactionCardProps = Transaction;

const DaoTransactionCard = (transaction: TransactionCardProps): JSX.Element => {
    const seed = Math.random();
    const deposit = seed > 0.5;
    const TxIcon = deposit ? <DAODepositIcon /> : <DAOWithdrawIcon />;
    return (
        <TransactionCard
            action={deposit ? "display" : "add"}
            label={deposit ? "Deposit" : "Withdraw"}
            TxIcon={TxIcon}
            units={"ckb"}
            {...transaction}
        />
    );
};

export default DaoTransactionCard;
