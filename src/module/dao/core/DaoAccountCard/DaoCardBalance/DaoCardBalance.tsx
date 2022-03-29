import { translate } from "locale";
import Balance from "module/wallet/component/display/Balance/Balance";
import { Col, Row, Typography } from "react-native-components";
import { DaoCardProps } from "../DaoCard";

const DaoCardBalance = ({availableBalance, lockedBalance, currentApc}: DaoCardProps): JSX.Element => {
    return (
        <Col gap={"3%"} style={{ paddingHorizontal: "4%" }}>
            <Row justifyContent="space-between">
                <Typography variant="body2">{translate("available")}</Typography>
                <Balance boldUnits smallBalance balance={availableBalance} decimals={6} units="ckb" variant="h1" />
            </Row>
            <Row justifyContent="space-between">
                <Typography variant="body2">{translate("locked")}</Typography>
                <Balance boldUnits smallBalance balance={lockedBalance} decimals={3} units="ckb" variant="h3" />
            </Row>
            <Row justifyContent="space-between">
                <Typography variant="body2">{translate("current_apc")}</Typography>
                <Typography variant="body1" fontWeight="bold">{`${currentApc}%`}</Typography>
            </Row>
        </Col>
    );
};

export default DaoCardBalance;
