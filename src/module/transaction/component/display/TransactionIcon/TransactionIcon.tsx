import { ArrowUpCircleIcon } from "icons";
import { TransactionIconRoot, TxIcon } from "./TransactionIcon.styles";
import { TransactionIconProps } from "./TransactionIcon.types";
import { TX_ICON } from "./txIcons";

//TODO: support transactions types
const TransactionIcon = ({ type }: TransactionIconProps): JSX.Element => {
    const { Icon, active } = TX_ICON[type] || {};
    return (
        <TransactionIconRoot active={active} alignItems="center" justifyContent="center">
            <TxIcon as={Icon || ArrowUpCircleIcon} active={active} />
        </TransactionIconRoot>
    );
};

export default TransactionIcon;
