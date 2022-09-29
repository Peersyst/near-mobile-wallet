import { Col } from "@peersyst/react-native-components";
import TransactionIcon from "module/transaction/component/display/TransactionIcon/TransactionIcon";
import { TouchableWithoutFeedback } from "react-native";
import { BaseTransactionCardProps } from "./BaseTransactionCard.types";
import { BaseTransactionCardRoot } from "./BaseTransactionCard.styles";

const BaseTransactionCard = ({ last = false, type, children, ...rest }: BaseTransactionCardProps): JSX.Element => {
    return (
        <TouchableWithoutFeedback {...rest}>
            <BaseTransactionCardRoot last={last}>
                <TransactionIcon type={type} />
                <Col gap={2} flex={1}>
                    {children}
                </Col>
            </BaseTransactionCardRoot>
        </TouchableWithoutFeedback>
    );
};

export default BaseTransactionCard;
