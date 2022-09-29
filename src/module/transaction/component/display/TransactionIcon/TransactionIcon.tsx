import { TransactionIconRoot, TxIcon } from "./TransactionIcon.styles";
import { TransactionIconProps } from "./TransactionIcon.types";
import { getTxIconUtils } from "./utils/getTxIconUtils";

const TransactionIcon = ({ type }: TransactionIconProps): JSX.Element => {
    const { Icon, active } = getTxIconUtils[type] || {};
    return (
        <TransactionIconRoot active={active} alignItems="center" justifyContent="center">
            <TxIcon as={Icon} active={active} />
        </TransactionIconRoot>
    );
};

export default TransactionIcon;
