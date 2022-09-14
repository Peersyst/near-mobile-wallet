import { Typography, TypographyProps } from "@peersyst/react-native-components";
import getTransactionLabel from "module/transaction/component/display/TransactionLabel/utils/getTransactionLabel";
import { FullTransaction } from "module/common/service/CkbSdkService.types";

export interface TransactionLabelProps extends Omit<TypographyProps, "children"> {
    type: FullTransaction["type"];
}

const TransactionLabel = ({ type, ...typographyProps }: TransactionLabelProps): JSX.Element => (
    <Typography {...typographyProps}>{getTransactionLabel(type)}</Typography>
);

export default TransactionLabel;
