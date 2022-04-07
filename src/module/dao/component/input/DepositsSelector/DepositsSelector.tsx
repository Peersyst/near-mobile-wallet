import { useControlled } from "@peersyst/react-hooks";
import { translate } from "locale";
import ControlledSuspense from "module/common/component/base/feedback/ControlledSuspense/ControlledSuspense";
import Select, { SelectProps } from "module/common/component/input/Select/Select";
import { DAOUnlockableAmount } from "module/common/service/mock/CkbServiceMock.types";
import Balance from "module/wallet/component/display/Balance/Balance";
import DepositItem from "./DepositItem";
import { EmptyDepositsComponent } from "./EmptyDepositsComponent";

interface DepositsSelectorProps extends Omit<SelectProps, "children" | "renderValue" | "icon" | "placeholder" | "title" | "multiple"> {
    deposits: DAOUnlockableAmount[];
}

const DepositsSelector = ({ deposits, value, onChange }: DepositsSelectorProps): JSX.Element => {
    const renderValue = (): JSX.Element => {
        return <Balance balance={deposits[0].amount} units={"CKB"} variant="body1" boldUnits />;
    };
    const [selectedIndex, setSelectedIndex] = useControlled(0, value as number, onChange);
    const handleItemChange = (i: unknown) => {
        setSelectedIndex(i as number);
    };
    return (
        <ControlledSuspense isLoading={deposits.length === 0} fallback={<EmptyDepositsComponent />}>
            <Select value={selectedIndex} onChange={handleItemChange} renderValue={renderValue} title={translate("select_deposit")}>
                {deposits.map((deposit, index) => {
                    return <DepositItem selectedIndex={selectedIndex} index={index} key={index} value={deposit.amount} />;
                })}
            </Select>
        </ControlledSuspense>
    );
};

export default DepositsSelector;
