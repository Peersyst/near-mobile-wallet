import { TransactionStatus as TransactionStatusType } from "module/transaction/types";
import { TypographyProps } from "react-native-components";
import { TransactionStatusRoot } from "module/transaction/component/display/TransactionStatus/TransactionStatus.styles";
import { translate } from "locale";

export interface TransactionStatusProps extends Omit<TypographyProps, "children"> {
    status: TransactionStatusType;
}

const TransactionStatus = ({ status, ...typographyProps }: TransactionStatusProps): JSX.Element => (
    <TransactionStatusRoot status={status} {...typographyProps}>
        {translate(status)}
    </TransactionStatusRoot>
);

export default TransactionStatus;
