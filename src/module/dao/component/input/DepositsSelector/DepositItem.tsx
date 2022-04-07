import { Row, SelectItem } from "react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import { DAOUnlockableAmount } from "module/common/service/mock/CkbServiceMock.types";
import { useSelected } from "module/common/component/base/input/Select/hooks/useSelected";

export interface DepositItemProps {
    value: DAOUnlockableAmount["amount"];
    selectedIndex: number;
    index: number;
}

const DepositItem = ({ value: amount, index, selectedIndex }: DepositItemProps): JSX.Element => {
    const isSelected = useSelected(index, selectedIndex, false);
    const itemColor = isSelected ? "#FFFFFF" : "#000000";
    return (
        <SelectItem value={amount}>
            <Row justifyContent="flex-start">
                <Balance style={{ color: itemColor }} balance={amount} units={"CKB"} variant="body1" boldUnits />
            </Row>
        </SelectItem>
    );
};

export default DepositItem;
