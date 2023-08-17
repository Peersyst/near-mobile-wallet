import { Col } from "@peersyst/react-native-components";
import { ActionDetailsProps } from "../SignRequestDetails.types";
import { FunctionCallActionParams } from "../actions.types";
import Typography from "module/common/component/display/Typography/Typography";
import Container from "module/common/component/display/Container/Container";
import ActionDetail from "module/transaction/component/core/ActionDetailsModal/ActionDetailsModalBody/ActionDetail";
import { useTranslate } from "module/common/hook/useTranslate";
import { TFuncKey } from "i18next";

const FunctionCallDetails = ({ params }: ActionDetailsProps): JSX.Element => {
    const functionCallParams = params as FunctionCallActionParams;

    const translate = useTranslate();

    return (
        <Col flex={1}>
            <Typography variant="h4Strong">{translate("callSmartContract")}</Typography>
            <Container>
                <Col flex={1} gap={20}>
                    {Object.entries(functionCallParams).map(([key, value]) => (
                        <ActionDetail key={key} title={translate(key as TFuncKey)}>
                            <Typography variant="body3Strong">{value}</Typography>
                        </ActionDetail>
                    ))}
                </Col>
            </Container>
        </Col>
    );
};

export default FunctionCallDetails;
