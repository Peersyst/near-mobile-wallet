import { translate } from "locale";
import { DaoBalanceType } from "module/dao/types";
import Balance from "module/wallet/component/display/Balance/Balance";
import { ActivityIndicator } from "react-native";
import { Col, Row, Typography } from "react-native-components";

type DaoCardProps = Partial<DaoBalanceType>;

const DaoCardBalance = ({ availableBalance, lockedBalance, currentAPC }: DaoCardProps): JSX.Element => {
    return (
        <Col gap={"3%"} style={{ paddingHorizontal: "4%" }}>
            <Row justifyContent="space-between">
                <Typography variant="body2">{translate("available")}</Typography>
                {availableBalance !== undefined ? (
                    <Balance boldUnits smallBalance balance={availableBalance} decimals={6} units="ckb" variant="h1" />
                ) : (
                    <ActivityIndicator testID="actIndicator" color="white" />
                )}
            </Row>
            <Row justifyContent="space-between">
                <Typography variant="body2">{translate("locked")}</Typography>
                {lockedBalance !== undefined ? (
                    <Balance boldUnits smallBalance balance={lockedBalance} decimals={3} units="ckb" variant="h3" />
                ) : (
                    <ActivityIndicator testID="actIndicator" color="white" />
                )}
            </Row>
            <Row justifyContent="space-between">
                <Typography variant="body2">{translate("current_apc")}</Typography>
                {currentAPC !== undefined ? (
                    <Typography variant="body1" fontWeight="bold">{`${currentAPC}%`}</Typography>
                ) : (
                    <ActivityIndicator testID="actIndicator" color="white" />
                )}
            </Row>
        </Col>
    );
};

export default DaoCardBalance;
