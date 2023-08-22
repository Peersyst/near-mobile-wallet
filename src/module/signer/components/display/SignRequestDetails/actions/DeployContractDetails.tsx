import { Col } from "@peersyst/react-native-components";
import { ActionDetailsProps } from "../SignRequestDetails.types";
import { DeployContractActionParams } from "../actions.types";
import Typography from "module/common/component/display/Typography/Typography";
import Container from "module/common/component/display/Container/Container";
import { useTranslate } from "module/common/hook/useTranslate";

const DeployContractDetails = ({ params }: ActionDetailsProps): JSX.Element => {
    const { code } = params as DeployContractActionParams;

    const translate = useTranslate();

    return (
        <Col flex={1} gap={24} alignItems="center">
            <Typography variant="h4Strong" textAlign="center">
                {translate("deployContract")}
            </Typography>
            <Col flex={1} gap={12}>
                <Typography variant="body2Regular" textAlign="center">
                    {translate("deployContractDescription")}
                </Typography>
                <Container>
                    <Typography variant="body2Regular" textAlign="center">
                        {code}
                    </Typography>
                </Container>
            </Col>
        </Col>
    );
};

export default DeployContractDetails;
