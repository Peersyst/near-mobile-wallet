import { translate } from "locale";
import Balance from "module/wallet/component/display/Balance/Balance";
import { Col, Typography } from "react-native-components";
import useGetDaoBalance from "module/dao/query/useGetDaoBalance";
import useGetBalance from "module/wallet/query/useGetBalance";
import DaoBalanceRow from "module/dao/component/core/DaoAccountCard/DaoCardBalance/DaoBalanceRow/DaoBalanceRow";

const DaoCardBalance = (): JSX.Element => {
    const { data: { daoDeposit = 0, daoCompensation = 0 } = {}, isLoading: daoBalanceLoading } = useGetDaoBalance();
    const { data: { freeBalance = 0 } = {}, isLoading: balanceLoading } = useGetBalance();
    return (
        <Col gap={"3%"} style={{ paddingHorizontal: "4%" }}>
            <DaoBalanceRow label={translate("available")} isLoading={balanceLoading}>
                <Balance boldUnits smallBalance balance={freeBalance} decimals={6} units="ckb" variant="h1" />
            </DaoBalanceRow>
            <DaoBalanceRow label={translate("locked")} isLoading={daoBalanceLoading}>
                <Balance boldUnits smallBalance balance={daoDeposit} decimals={3} units="ckb" variant="h2" />
            </DaoBalanceRow>
            <DaoBalanceRow label={translate("current_apc")} isLoading={daoBalanceLoading}>
                <Typography variant="body1" fontWeight="bold">{`${daoCompensation}%`}</Typography>
            </DaoBalanceRow>
        </Col>
    );
};

export default DaoCardBalance;
