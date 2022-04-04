import { translate } from "locale";
import ControlledSuspense from "module/common/component/base/feedback/ControlledSuspense/ControlledSuspense";
import { DaoBalanceType } from "module/dao/types";
import Balance from "module/wallet/component/display/Balance/Balance";
import { Col, Row, Typography } from "react-native-components";

type DaoCardProps = Partial<DaoBalanceType>;

const DaoCardBalance = ({ availableBalance, lockedBalance, currentAPC }: DaoCardProps): JSX.Element => {
    return (
        <Col gap={"3%"} style={{ paddingHorizontal: "4%" }}>
            <Row justifyContent="space-between" alignItems="center">
                <Typography variant="body2">{translate("available")}</Typography>
                <ControlledSuspense isLoading={availableBalance === undefined} color="white" size="small">
                    <Balance boldUnits smallBalance balance={availableBalance!} decimals={6} units="ckb" variant="h1" />
                </ControlledSuspense>
            </Row>
            <Row justifyContent="space-between" alignItems="center">
                <Typography variant="body2">{translate("locked")}</Typography>
                <ControlledSuspense isLoading={lockedBalance === undefined} color="white" size="small">
                    <Balance boldUnits smallBalance balance={lockedBalance!} decimals={3} units="ckb" variant="h3" />
                </ControlledSuspense>
            </Row>
            <Row justifyContent="space-between" alignItems="center">
                <Typography variant="body2">{translate("current_apc")}</Typography>
                <ControlledSuspense isLoading={currentAPC === undefined} color="white" size="small">
                    <Typography variant="body1" fontWeight="bold">{`${currentAPC}%`}</Typography>
                </ControlledSuspense>
            </Row>
        </Col>
    );
};

export default DaoCardBalance;
