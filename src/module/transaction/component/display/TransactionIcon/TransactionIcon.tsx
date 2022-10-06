import { TransactionIconRoot, TxIcon } from "./TransactionIcon.styles";
import { TransactionIconProps } from "./TransactionIcon.types";
import { TX_ICON } from "./txIcons";

const TransactionIcon = ({ type }: TransactionIconProps): JSX.Element => {
    const { Icon, active } = TX_ICON[type] || {};
    return (
        <TransactionIconRoot active={active} alignItems="center" justifyContent="center">
            <TxIcon as={Icon} active={active} />
        </TransactionIconRoot>
    );
};

export default TransactionIcon;
