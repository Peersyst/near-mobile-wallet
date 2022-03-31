import { ReceiveIcon, SendIcon } from "icons";
import { tokensList } from "module/token/mock/token";
import { Transaction } from "module/transaction/types";
import { getTokenName } from "../../utils/getToken";
import TransactionCard from "../TransactionCard/TransactionCard";

export type TransactionCardProps = Transaction;

const MainTransactionCard = (transaction: TransactionCardProps): JSX.Element => {
    const seed = Math.random();
    const received = seed > 0.5;
    const token = getTokenName(seed > 0.6 ? tokensList[Math.trunc(seed * 6)].args : "0x0");
    const TxIcon = received ? <ReceiveIcon /> : <SendIcon />;

    return (
        <TransactionCard
            action={received ? "add" : "subtract"}
            units={token}
            label={received ? "Received" : "Send"}
            TxIcon={TxIcon}
            {...transaction}
        />
    );
};

export default MainTransactionCard;
