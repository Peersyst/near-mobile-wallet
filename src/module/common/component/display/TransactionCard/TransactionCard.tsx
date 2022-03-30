import { Transaction } from "module/transaction/types";
import { Col, Row, Typography } from "react-native-components";
import { TransactionCardRoot, TransactionIcon } from "module/transaction/component/display/MainTransactionCard/TransactionCard.styles";
import formatDate from "utils/formatDate";
import Balance from "module/wallet/component/display/Balance/Balance";
import formatNumber from "utils/formatNumber";
import { ReactElement } from "react";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";

export type TransactionCardProps = Transaction & {
    TxIcon: ReactElement;
    label: string;
} & Pick<BalanceProps, "units" | "action">;

const TransactionCard = ({ timestamp, TxIcon, label, units, action }: TransactionCardProps): JSX.Element => {

    return (
        <TransactionCardRoot>
            <TransactionIcon>{TxIcon}</TransactionIcon>
            <Col gap={2} flex={1}>
                <Row justifyContent="space-between">
                    <Typography variant="body1" fontWeight="bold">
                        {label}
                    </Typography>
                    <Balance
                        balance={((timestamp.getTime() * (1 + Math.random())) / Math.pow(12, 9)).toFixed(2)}
                        units={units}
                        variant="body1"
                        action={action}
                        fontWeight="bold"
                        boldUnits
                    />
                </Row>
                <Row justifyContent="space-between">
                    <Typography variant="body2" style={{ marginLeft: 10 }}>
                        {formatDate(timestamp)}
                    </Typography>
                    <Typography variant="body2">
                        {formatNumber(((timestamp.getTime() * (1 + Math.random())) / Math.pow(10, 9)).toFixed(2), { minDecimals: 2 })} USD
                    </Typography>
                </Row>
            </Col>
        </TransactionCardRoot>
    );
};

export default TransactionCard;
