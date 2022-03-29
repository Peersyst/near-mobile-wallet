import { translate } from "locale";
import Balance from "module/wallet/component/display/Balance/Balance";
import { Col, Row, Typography } from "react-native-components";

const DaoCardBalance = (): JSX.Element => {
    return (
        <Col gap={6} style={{ paddingHorizontal: 10 }}>
            <Row justifyContent="space-between">
                <Typography variant="body2">{translate("available")}</Typography>
                <Balance boldUnits smallBalance balance={"12635.304223"} decimals={6} units="ckb" variant="h1" />
            </Row>
            <Row justifyContent="space-between">
                <Typography variant="body2">{translate("locked")}</Typography>
                <Balance boldUnits smallBalance balance={"12635.304223"} decimals={6} units="ckb" variant="h3" />
            </Row>
            <Row justifyContent="space-between">
                <Typography variant="body2">{translate("current_apc")}</Typography>
                <Typography variant="body1" fontWeight="bold">{`${2.4}%`}</Typography>
            </Row>
        </Col>
    );
};

export default DaoCardBalance;
