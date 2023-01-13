import TokenIcon, { TokenIconProps } from "module/token/component/display/TokenIcon/TokenIcon";
import Balance from "module/wallet/component/display/Balance/Balance";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import BaseSelectItemCard, { BaseSelectItemCardProps } from "./BaseSelectItemCard";

export interface BaseTokenSelectItemProps {
    token?: TokenIconProps["token"];
    balance: BalanceProps["balance"];
    units: BalanceProps["units"];
    onPress: BaseSelectItemCardProps["onPress"];
}

const BaseTokenSelectItem = ({ token, balance, units, onPress }: BaseTokenSelectItemProps): JSX.Element => {
    return (
        <BaseSelectItemCard onPress={onPress}>
            <TokenIcon token={token} nativeToken={token === undefined} />
            <Balance balance={balance} variant="body2Strong" units={units} />
        </BaseSelectItemCard>
    );
};

export default BaseTokenSelectItem;
