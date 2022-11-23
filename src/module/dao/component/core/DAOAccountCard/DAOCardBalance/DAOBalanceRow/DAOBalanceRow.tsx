import { ReactElement } from "react";
import { Typography, Suspense } from "@peersyst/react-native-components";
import { DAOBalanceRowRoot } from "module/dao/component/core/DAOAccountCard/DAOCardBalance/DAOBalanceRow/DAOBalanceRow.styles";

export interface DAOBalanceRowProps {
    label: string;
    isLoading?: boolean;
    children: ReactElement;
}

const DAOBalanceRow = ({ label, isLoading = false, children: child }: DAOBalanceRowProps): JSX.Element => (
    <DAOBalanceRowRoot>
        <Typography variant="body2">{label}</Typography>
        <Suspense isLoading={isLoading} activityIndicatorColor="white" activityIndicatorSize="small">
            {child}
        </Suspense>
    </DAOBalanceRowRoot>
);

export default DAOBalanceRow;
