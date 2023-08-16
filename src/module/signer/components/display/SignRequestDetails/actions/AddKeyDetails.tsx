import { Col, Row } from "@peersyst/react-native-components";
import { ActionDetailsProps } from "../SignRequestDetails.types";
import Typography from "module/common/component/display/Typography/Typography";
import { AddKeyActionParams } from "../actions.types";
import Balance from "module/wallet/component/display/Balance/Balance";
import { convertYoctoToNear } from "near-peersyst-sdk";
import Container from "module/common/component/display/Container/Container";

const AddKeyDetails = ({ params }: ActionDetailsProps): JSX.Element => {
    const {
        accessKey: { permission },
    } = params as AddKeyActionParams;

    const isFullAccess = permission === "FullAccess";

    return isFullAccess ? (
        <Col flex={1} gap={16} alignItems="center">
            <Typography variant="h4Strong" textAlign="center">
                Add FullAccess key
            </Typography>
            <Typography variant="body2Regular" textAlign="center">
                By approving this request, third party dapp will have a complete access to your account. Please, consider carefully before
                approving.
            </Typography>
        </Col>
    ) : (
        <Col flex={1} gap={24}>
            <Typography variant="body2Regular" textAlign="center">
                By approving this request, {permission.receiverId} will be able to call smart contract methods on your behalf.
            </Typography>
            <Container>
                <Col gap={16}>
                    {permission.allowance && (
                        <Row justifyContent="space-between">
                            <Typography variant="body2Strong">Allowed gas</Typography>
                            <Balance variant="body2Regular" balance={convertYoctoToNear(permission.allowance)} units="token" />
                        </Row>
                    )}
                    <Row justifyContent="space-between">
                        <Typography variant="body2Strong">Smart contract calls</Typography>
                        <Typography variant="body2Regular">
                            {permission.methodNames && permission.methodNames?.length
                                ? permission.methodNames.map((method) => `${method}`)
                                : "All methods"}
                        </Typography>
                    </Row>
                </Col>
            </Container>
        </Col>
    );
};

export default AddKeyDetails;
