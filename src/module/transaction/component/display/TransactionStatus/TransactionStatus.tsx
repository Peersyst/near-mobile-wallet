import { TypographyProps } from "@peersyst/react-native-components";
import { TransactionStatusRoot } from "module/transaction/component/display/TransactionStatus/TransactionStatus.styles";
import { TransactionStatus as TransactionStatusType } from "ckb-peersyst-sdk";
import { useTranslate } from "module/common/hook/useTranslate";

export interface TransactionStatusProps extends Omit<TypographyProps, "children"> {
    status: TransactionStatusType;
}

const TransactionStatus = ({ status, ...typographyProps }: TransactionStatusProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <TransactionStatusRoot status={status} {...typographyProps}>
            {translate(status)}
        </TransactionStatusRoot>
    );
};

export default TransactionStatus;
