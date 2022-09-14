import { translate } from "locale";
import Balance from "module/wallet/component/display/Balance/Balance";
import { Col, Typography } from "@peersyst/react-native-components";
import useGetBalance from "module/wallet/query/useGetBalance";
import DAOBalanceRow from "./DAOBalanceRow/DAOBalanceRow";
import useGetDAOBalance from "module/dao/query/useGetDAOBalance";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import useGetDaoInfo from "module/dao/query/useGetDaoInfo";

const DAOCardBalance = (): JSX.Element => {
    const { data: daoBalance, isLoading: daoBalanceLoading } = useGetDAOBalance();
    const { data: { estimated_apc = "0" } = {}, isLoading: loadingDao } = useGetDaoInfo();
    const { data: { freeBalance = 0 } = {}, isLoading: balanceLoading } = useGetBalance();
    const { name } = useSelectedWallet();
    return (
        <Col gap={"2%"} style={{ paddingHorizontal: "4%" }}>
            <DAOBalanceRow label={translate("wallet")}>
                <Typography variant="body1" fontWeight="bold" numberOfLines={1} style={{ maxWidth: "50%" }}>
                    {name}
                </Typography>
            </DAOBalanceRow>
            <DAOBalanceRow label={translate("available")} isLoading={balanceLoading}>
                <Balance boldUnits smallBalance balance={freeBalance} decimals={6} units="ckb" variant="h2" />
            </DAOBalanceRow>
            <DAOBalanceRow label={translate("locked")} isLoading={daoBalanceLoading}>
                <Balance boldUnits smallBalance balance={daoBalance?.daoDeposit || 0} decimals={3} units="ckb" variant="h3" />
            </DAOBalanceRow>
            <DAOBalanceRow label={translate("estimated_apc")} isLoading={loadingDao}>
                <Typography variant="body1" fontWeight="bold">{`${estimated_apc}%`}</Typography>
            </DAOBalanceRow>
        </Col>
    );
};

export default DAOCardBalance;
