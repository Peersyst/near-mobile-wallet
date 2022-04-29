import { Row, SelectItem, Typography } from "react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import { useSelected } from "module/common/component/base/input/Select/hooks/useSelected";
import { DAOUnlockableAmount } from "@peersyst/ckb-peersyst-sdk";
import formatTimeDAORemainingCycle from "module/transaction/component/utils/formatTimeDAORemainingCycle";

export interface DepositItemProps {
    amount: DAOUnlockableAmount["amount"];
    value: number;
    selectedIndex: number;
    remainingCycleMinutes: DAOUnlockableAmount["remainingCycleMinutes"];
}

const DepositItem = ({ value, selectedIndex, amount, remainingCycleMinutes }: DepositItemProps): JSX.Element => {
    const isSelected = useSelected(value, selectedIndex, false);
    const itemColor = isSelected ? "#FFFFFF" : "#000000";
    return (
        <SelectItem value={value} key={value}>
            <Row justifyContent="flex-start">
                <Balance style={{ color: itemColor }} balance={amount} units={"CKB"} variant="body1" boldUnits />
            </Row>
            <Row justifyContent="flex-start">
                <Typography variant="body1">{formatTimeDAORemainingCycle(remainingCycleMinutes)}</Typography>
            </Row>
        </SelectItem>
    );
};

export default DepositItem;
