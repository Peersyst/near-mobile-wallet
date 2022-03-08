import { translate } from "locale";
import { Row } from "react-native-components";
import { BalanceInteger, TokenText } from "../AccountCard.styles";

interface AccountBalanceProps {
    balance: string;
}

const AccountCardBalance = ({ balance: balanceProps }: AccountBalanceProps): JSX.Element => {
    const balance = balanceProps.split(".");
    return (
        <Row gap={10}>
            <Row>
                <BalanceInteger variant="h2">{`${balance[0]}.`}</BalanceInteger>
                <BalanceInteger variant="caption">{`${balance[1]}`}</BalanceInteger>
            </Row>
            <TokenText variant="h2">{translate("token")}</TokenText>
        </Row>
    );
};

export default AccountCardBalance;
