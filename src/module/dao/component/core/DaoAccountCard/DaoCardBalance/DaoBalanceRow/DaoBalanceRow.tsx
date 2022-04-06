import { ReactElement } from "react";
import { Typography } from "react-native-components";
import ControlledSuspense from "module/common/component/base/feedback/ControlledSuspense/ControlledSuspense";
import { DaoBalanceRowRoot } from "module/dao/component/core/DaoAccountCard/DaoCardBalance/DaoBalanceRow/DaoBalanceRow.styles";

export interface DaoBalanceRowProps {
    label: string;
    isLoading?: boolean;
    children: ReactElement;
}

const DaoBalanceRow = ({ label, isLoading = false, children: child }: DaoBalanceRowProps): JSX.Element => (
    <DaoBalanceRowRoot>
        <Typography variant="body2">{label}</Typography>
        <ControlledSuspense isLoading={isLoading} activityIndicatorColor="white" activityIndicatorSize="small">
            {child}
        </ControlledSuspense>
    </DaoBalanceRowRoot>
);

export default DaoBalanceRow;
