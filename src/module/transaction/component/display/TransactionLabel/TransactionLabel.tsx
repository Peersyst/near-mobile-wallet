import { Transaction } from "module/transaction/types";
import { Typography, TypographyProps } from "react-native-components";
import getTransactionLabel from "module/transaction/component/display/TransactionLabel/utils/getTransactionLabel";

export interface TransactionLabelProps extends Omit<TypographyProps, "children"> {
    type: Transaction["type"];
}

const TransactionLabel = ({ type, ...typographyProps }: TransactionLabelProps): JSX.Element => (
    <Typography {...typographyProps}>{getTransactionLabel(type)}</Typography>
);

export default TransactionLabel;
