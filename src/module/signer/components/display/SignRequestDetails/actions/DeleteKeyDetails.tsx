import { Col, Hash, Typography } from "@peersyst/react-native-components";
import { ActionDetailsProps } from "../SignRequestDetails.types";
import { DeleteKeyActionParams } from "../actions.types";
import Container from "module/common/component/display/Container/Container";
import { useTranslate } from "module/common/hook/useTranslate";

const DeleteKeyDetails = ({ params }: ActionDetailsProps): JSX.Element => {
    const { publicKey } = params as DeleteKeyActionParams;

    const translate = useTranslate();

    return (
        <Col flex={1} gap={24} alignItems="center">
            <Typography variant="h4Strong" textAlign="center">
                {translate("deleteAccessKey")}
            </Typography>
            <Col flex={1} gap={12}>
                <Typography variant="body2Regular" textAlign="center">
                    {translate("deleteAccessKeyDescription")}
                </Typography>
                <Container>
                    <Hash variant="body2Regular" hash={publicKey} length={8} textAlign="center" />
                </Container>
            </Col>
        </Col>
    );
};

export default DeleteKeyDetails;
