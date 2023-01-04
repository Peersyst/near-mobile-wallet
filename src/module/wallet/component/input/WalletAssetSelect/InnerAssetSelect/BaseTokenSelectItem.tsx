import TokenIcon, { TokenIconProps } from "module/token/component/display/TokenIcon/TokenIcon";
import Balance from "module/wallet/component/display/Balance/Balance";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import BaseSelectItemCard, { BaseSelectItemCardProps } from "./BaseSelectItemCard";

export interface BaseTokenSelectItemProps {
    icon: TokenIconProps["icon"];
    balance: BalanceProps["balance"];
    units: BalanceProps["units"];
    onPress: BaseSelectItemCardProps["onPress"];
}

const BaseTokenSelectItem = ({ icon, balance, units, onPress }: BaseTokenSelectItemProps): JSX.Element => {
    return (
        <BaseSelectItemCard onPress={onPress}>
            <TokenIcon icon={icon} />
            <Balance balance={balance} variant="body2Strong" units={units} />
        </BaseSelectItemCard>
    );
};

export default BaseTokenSelectItem;
