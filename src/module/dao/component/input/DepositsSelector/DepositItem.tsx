import { Row, SelectItem } from "react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import { useSelected } from "module/common/component/base/input/Select/hooks/useSelected";
import { DAOUnlockableAmount } from "@peersyst/ckb-peersyst-sdk";

export interface DepositItemProps {
    amount: DAOUnlockableAmount["amount"];
    value: number;
    selectedIndex: number;
}

const DepositItem = ({ value, selectedIndex, amount }: DepositItemProps): JSX.Element => {
    const isSelected = useSelected(value, selectedIndex, false);
    const itemColor = isSelected ? "#FFFFFF" : "#000000";
    return (
        <SelectItem value={value} key={value}>
            <Row justifyContent="flex-start">
                <Balance style={{ color: itemColor }} balance={amount} units={"CKB"} variant="body1" boldUnits />
            </Row>
        </SelectItem>
    );
};

export default DepositItem;
