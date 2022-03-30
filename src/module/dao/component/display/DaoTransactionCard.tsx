


export type TransactionCardProps = Transaction;

const DaoTransactionCard = (transaction: TransactionCardProps): JSX.Element => {
    const seed = Math.random();
    const received = seed > 0.5;
    const TxIcon = received ? <ReceiveIcon /> : <SendIcon />;
    return <TransactionCard action={received ? "add" : "subtract"} label={received ? "received" : "send"} TxIcon={TxIcon} units={token} {...transaction} />;
};

export default DaoTransactionCard;