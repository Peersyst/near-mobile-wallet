import { Col } from "@peersyst/react-native-components";
import { ActionDetailsProps } from "../SignRequestDetails.types";
import Typography from "module/common/component/display/Typography/Typography";
import { useTranslate } from "module/common/hook/useTranslate";
import { TransferActionParams } from "../actions.types";
import Balance from "module/wallet/component/display/Balance/Balance";
import Container from "module/common/component/display/Container/Container";

const TransferDetails = ({ params, receiverId }: ActionDetailsProps): JSX.Element => {
    const { deposit } = params as TransferActionParams;

    const translate = useTranslate();

    return (
        <Col flex={1} gap={24} alignItems="center">
            <Typography variant="h4Strong" textAlign="center">
                {translate("transferAction")}
            </Typography>
            <Col gap={12}>
                <Typography variant="body2Regular" textAlign="center">
                    {translate("transferActionDescription", { receiverId })}
                </Typography>
                <Container>
                    <Balance variant="body2Strong" units="token" balance={deposit} textAlign="center" />
                </Container>
            </Col>
        </Col>
    );
};

export default TransferDetails;
