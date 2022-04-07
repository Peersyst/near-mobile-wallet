import { translate } from "locale";
import Balance from "module/wallet/component/display/Balance/Balance";
import { Col, Typography } from "react-native-components";
import useGetBalance from "module/wallet/query/useGetBalance";
import DAOBalanceRow from "./DAOBalanceRow/DAOBalanceRow";
import useGetDAOBalance from "module/dao/query/useGetDAOBalance";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";

const DAOCardBalance = (): JSX.Element => {
    const { data: { daoDeposit = 0, daoCompensation = 0 } = {}, isLoading: daoBalanceLoading } = useGetDAOBalance();
    const { data: { freeBalance = 0 } = {}, isLoading: balanceLoading } = useGetBalance();
    const { name } = useSelectedWallet();
    return (
        <Col gap={"2%"} style={{ paddingHorizontal: "4%" }}>
            <DAOBalanceRow label={translate("wallet")}>
                <Typography variant="body1" fontWeight="bold">
                    {name}
                </Typography>
            </DAOBalanceRow>
            <DAOBalanceRow label={translate("available")} isLoading={balanceLoading}>
                <Balance boldUnits smallBalance balance={freeBalance} decimals={6} units="ckb" variant="h2" />
            </DAOBalanceRow>
            <DAOBalanceRow label={translate("locked")} isLoading={daoBalanceLoading}>
                <Balance boldUnits smallBalance balance={daoDeposit} decimals={3} units="ckb" variant="h3" />
            </DAOBalanceRow>
            <DAOBalanceRow label={translate("current_apc")} isLoading={daoBalanceLoading}>
                <Typography variant="body1" fontWeight="bold">{`${daoCompensation}%`}</Typography>
            </DAOBalanceRow>
        </Col>
    );
};

export default DAOCardBalance;
