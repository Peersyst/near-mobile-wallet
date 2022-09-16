import { Typography, TypographyProps } from "@peersyst/react-native-components";
import { FullTransaction } from "module/common/service/CkbSdkService.types";
import useGetTransactionLabel from "./hook/useGetTransactionLabel";

export interface TransactionLabelProps extends Omit<TypographyProps, "children"> {
    type: FullTransaction["type"];
}

const TransactionLabel = ({ type, ...typographyProps }: TransactionLabelProps): JSX.Element => {
    const label = useGetTransactionLabel(type);
    return <Typography {...typographyProps}>{label}</Typography>;
};

export default TransactionLabel;
