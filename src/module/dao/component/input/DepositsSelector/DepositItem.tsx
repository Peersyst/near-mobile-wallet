import { Row, SelectItem, Typography } from "react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import { useSelected } from "module/common/component/base/input/Select/hooks/useSelected";
import { DAOUnlockableAmount } from "@peersyst/ckb-peersyst-sdk";
import formatTimeDAORemainingCycle from "module/transaction/component/utils/formatTimeDAORemainingCycle";
import { DepositItemText } from "./DepositItem.styles";
import { translate } from "locale";

export interface DepositItemProps {
    amount: DAOUnlockableAmount["amount"];
    value: number;
    selectedIndex: number;
    remainingCycleMinutes: DAOUnlockableAmount["remainingCycleMinutes"];
    unlockable: DAOUnlockableAmount["unlockable"];
}

export interface DepositItemTextProps {
    unlockable: DAOUnlockableAmount["unlockable"];
    selected: boolean;
}

const DepositItem = ({ value, selectedIndex, amount, remainingCycleMinutes, unlockable }: DepositItemProps): JSX.Element => {
    const isSelected = useSelected(value, selectedIndex, false);
    return (
        <SelectItem value={value} key={value}>
            <Row justifyContent="flex-start">
                <DepositItemText
                    as={Balance}
                    unlockable={unlockable}
                    selected={isSelected}
                    balance={amount}
                    units={"CKB"}
                    variant="body1"
                    boldUnits
                />
                <DepositItemText unlockable={unlockable} selected={isSelected} variant="body2">
                    {" - "}
                </DepositItemText>
            </Row>
            <Row justifyContent="flex-start">
                <DepositItemText unlockable={unlockable} selected={isSelected} variant="body2">
                    {unlockable ? translate("available") : translate("remaining_time") + ": " + formatTimeDAORemainingCycle(120)}
                </DepositItemText>
            </Row>
        </SelectItem>
    );
};

export default DepositItem;
