import Typography, { TypographyProps } from "module/common/component/display/Typography/Typography";
import { useTranslate } from "module/common/hook/useTranslate";
import { FullTransaction } from "near-peersyst-sdk";
import { TX_LABEL } from "./utils/txLabel";

export interface TransactionLabelProps extends Omit<TypographyProps, "children"> {
    type: FullTransaction["type"];
    accountId?: string;
}

const TransactionLabel = ({ type, accountId, ...typographyProps }: TransactionLabelProps): JSX.Element => {
    const t = useTranslate();
    return (
        <Typography {...typographyProps} color={(p) => p.gray[600]}>
            {t(TX_LABEL[type])}
            {accountId && ` (${accountId})`}
        </Typography>
    );
};

export default TransactionLabel;
