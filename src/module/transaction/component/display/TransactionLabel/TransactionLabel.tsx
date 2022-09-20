import { Typography, TypographyProps } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import { FullTransaction } from "module/common/service/CkbSdkService.types";
import getTransactionLabel from "./utils/getTransactionLabel";

export interface TransactionLabelProps extends Omit<TypographyProps, "children"> {
    type: FullTransaction["type"];
}

const TransactionLabel = ({ type, ...typographyProps }: TransactionLabelProps): JSX.Element => {
    const translate = useTranslate();
    const label = getTransactionLabel(type, translate);
    return <Typography {...typographyProps}>{label}</Typography>;
};

export default TransactionLabel;
