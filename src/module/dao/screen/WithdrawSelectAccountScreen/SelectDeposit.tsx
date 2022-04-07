import { translate } from "locale";
import ControlledSuspense from "module/common/component/base/feedback/ControlledSuspense/ControlledSuspense";
import FormGroup from "module/common/component/input/FormGroup/FormGroup";
import DepositsSelector from "module/dao/component/input/DepositsSelector/DepositsSelector";
import useGetDAOUnlockableAmounts from "module/dao/query/useGetDAOUnlockableAmounts";

const SelectDeposit = (): JSX.Element => {
    const { data = [], isLoading } = useGetDAOUnlockableAmounts();
    return (
        <FormGroup label={`${translate("select_deposit")} :`} style={{ height: 80 }}>
            <ControlledSuspense isLoading={isLoading} activityIndicatorSize={30}>
                <DepositsSelector name="amount" deposits={data} required defaultValue={0} />
            </ControlledSuspense>
        </FormGroup>
    );
};

export default SelectDeposit;
