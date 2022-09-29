import { TransactionType } from "ckb-peersyst-sdk";
import { TouchableWithoutFeedbackProps } from "react-native";

export interface BaseTransactionCardProps extends TouchableWithoutFeedbackProps {
    last?: boolean;
    type: TransactionType;
}
export interface BaseTransactionRootProps {
    last: boolean;
}
