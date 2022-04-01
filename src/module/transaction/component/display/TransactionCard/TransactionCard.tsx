import { Col, Row, Typography } from "react-native-components";
import formatDate from "utils/formatDate";
import Balance from "module/wallet/component/display/Balance/Balance";
import { TransactionCardRoot } from "./TransactionCard.styles";
import { TransactionCardProps } from "./TransactionCard.types";

const TransactionCard = ({ timestamp, TxIcon, label, amount, action, units }: TransactionCardProps): JSX.Element => {
    return (
        <TransactionCardRoot>
            {TxIcon}
            <Col gap={2} flex={1}>
                <Row justifyContent="space-between">
                    <Typography variant="body1" fontWeight="bold">
                        {label}
                    </Typography>
                    <Balance boldUnits action={action} variant="body1" fontWeight="bold" balance={amount} units={units} />
                </Row>
                <Row justifyContent="space-between">
                    <Typography variant="body2" style={{ marginLeft: 10 }}>
                        {formatDate(timestamp)}
                    </Typography>
                </Row>
            </Col>
        </TransactionCardRoot>
    );
};

export default TransactionCard;
