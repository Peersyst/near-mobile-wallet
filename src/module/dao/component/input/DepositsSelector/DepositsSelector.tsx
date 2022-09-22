import { DAOUnlockableAmount } from "ckb-peersyst-sdk";
import { useControlled } from "@peersyst/react-hooks";
import { Suspense } from "@peersyst/react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import { Typography } from "@peersyst/react-native-components";
import DepositItem from "./DepositItem";
import { DepositItemText } from "./DepositItem.styles";
import { convertShannonsToCKB } from "module/wallet/utils/convertShannonsToCKB";
import Select, { SelectProps } from "module/common/component/input/Select/Select";
import { useTranslate } from "module/common/hook/useTranslate";

interface DepositsSelectorProps
    extends Omit<SelectProps<number>, "options" | "children" | "renderValue" | "icon" | "placeholder" | "title" | "multiple"> {
    deposits: DAOUnlockableAmount[];
}

const EmptyDepositsComponent = () => {
    const translate = useTranslate();
    return (
        <Typography variant="body1" textAlign="center" fontWeight="bold" style={{ marginVertical: 4 }}>
            {translate("no_deposits")}
        </Typography>
    );
};

const DepositsSelector = ({ deposits, value, onChange, ...rest }: DepositsSelectorProps): JSX.Element => {
    const [selectedIndex, setSelectedIndex] = useControlled(0, value as number, onChange);
    const translate = useTranslate();
    const handleItemChange = (i: unknown) => {
        setSelectedIndex(i as number);
    };
    return (
        <Suspense isLoading={deposits.length === 0} fallback={<EmptyDepositsComponent />}>
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
        </Suspense>
    );
};

export default DepositsSelector;
