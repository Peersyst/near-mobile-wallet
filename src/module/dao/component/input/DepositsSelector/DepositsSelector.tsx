import { DAOUnlockableAmount } from "ckb-peersyst-sdk";
import { useControlled } from "@peersyst/react-hooks";
import { translate } from "locale";
import ControlledSuspense from "module/common/component/base/feedback/ControlledSuspense/ControlledSuspense";
import Select, { SelectProps } from "module/common/component/input/Select/Select";
import Balance from "module/wallet/component/display/Balance/Balance";
import { Typography } from "react-native-components";
import DepositItem from "./DepositItem";
import { DepositItemText } from "./DepositItem.styles";
import { convertShannonsToCKB } from "module/wallet/utils/convertShannonsToCKB";

interface DepositsSelectorProps extends Omit<SelectProps, "children" | "renderValue" | "icon" | "placeholder" | "title" | "multiple"> {
    deposits: DAOUnlockableAmount[];
}

const EmptyDepositsComponent = () => {
    return (
        <Typography variant="body1" textAlign="center" fontWeight="bold" style={{ marginVertical: 4 }}>
            {translate("no_deposits")}
        </Typography>
    );
};

const DepositsSelector = ({ deposits, value, onChange, ...rest }: DepositsSelectorProps): JSX.Element => {
    const [selectedIndex, setSelectedIndex] = useControlled(0, value as number, onChange);
    const handleItemChange = (i: unknown) => {
        setSelectedIndex(i as number);
    };
    return (
        <ControlledSuspense isLoading={deposits.length === 0} fallback={<EmptyDepositsComponent />}>
            <Select
                value={selectedIndex}
                onChange={handleItemChange}
                renderValue={() => (
                    <DepositItemText
                        as={Balance}
                        balance={convertShannonsToCKB(deposits[selectedIndex].amount)}
                        units={"CKB"}
                        variant="body1"
                        boldUnits
                        unlockable={deposits[selectedIndex].unlockable}
                        selected={false}
                        type={deposits[selectedIndex].type}
                    />
                )}
                title={translate("select_deposit")}
                {...rest}
            >
                {deposits.map(({ remainingCycleMinutes, amount, unlockable, compensation, type }, index) => {
                    return (
                        <DepositItem
                            type={type}
                            compensation={compensation}
                            remainingCycleMinutes={remainingCycleMinutes}
                            amount={amount}
                            unlockable={unlockable}
                            key={index}
                            selectedIndex={selectedIndex}
                            value={index}
                        />
                    );
                })}
            </Select>
        </ControlledSuspense>
    );
};

export default DepositsSelector;
