import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import TokenIcon, { TokenIconProps } from "module/token/component/display/TokenIcon/TokenIcon";
import Balance from "module/wallet/component/display/Balance/Balance";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";

export interface BaseTokenSelectItemProps {
    icon: TokenIconProps["icon"];
    balance: BalanceProps["balance"];
    units: BalanceProps["units"];
}

const BaseTokenSelectItem = ({ icon, balance, units }: BaseTokenSelectItemProps) => {
    return (
        <MainListCard alignItems="center" gap="5%">
            <TokenIcon icon={icon} />
            <Balance balance={balance} variant="body2Strong" units={units} />
        </MainListCard>
    );
};

export default BaseTokenSelectItem;
