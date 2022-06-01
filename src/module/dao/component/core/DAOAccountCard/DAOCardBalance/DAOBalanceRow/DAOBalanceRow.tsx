import { ReactElement } from "react";
import { Typography } from "react-native-components";
import ControlledSuspense from "module/common/component/base/feedback/ControlledSuspense/ControlledSuspense";
import { DAOBalanceRowRoot } from "module/dao/component/core/DAOAccountCard/DAOCardBalance/DAOBalanceRow/DAOBalanceRow.styles";

export interface DAOBalanceRowProps {
    label: string;
    isLoading?: boolean;
    children: ReactElement;
}

const DAOBalanceRow = ({ label, isLoading = false, children: child }: DAOBalanceRowProps): JSX.Element => (
    <DAOBalanceRowRoot>
        <Typography variant="body2">{label}</Typography>
        <ControlledSuspense isLoading={isLoading} activityIndicatorColor="white" activityIndicatorSize="small">
            {child}
        </ControlledSuspense>
    </DAOBalanceRowRoot>
);

export default DAOBalanceRow;
