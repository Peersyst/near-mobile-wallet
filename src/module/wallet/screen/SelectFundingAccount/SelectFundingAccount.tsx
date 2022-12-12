import { Col } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";

const SelectFundingAccount = () => {
    return (
        <Col>
            <Typography variant="body3Strong" light>
                You need to fund it with 0.1 NEAR. You can fund it with an existing account or import a new one.
            </Typography>
        </Col>
    );
};

export default SelectFundingAccount;
