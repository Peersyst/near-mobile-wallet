import { formatHash } from "@peersyst/react-utils";
import { translate } from "locale";
import { SendState } from "module/transaction/state/SendState";
import { Col } from "@peersyst/react-native-components";
import BaseSendSummary, { BaseSendSummaryProps } from "../../component/display/BaseSendSummary/BaseSendSummary";
import SummaryField from "../../component/display/SummaryField/SummaryField";

export interface SendSummaryProps extends BaseSendSummaryProps {
    senderName: string;
    senderAddress: string;
    receiverAddress: SendState["receiverAddress"];
    message: SendState["message"];
}

const SendSummary = ({ amount, fee, receiverAddress, message, senderName, senderAddress }: SendSummaryProps): JSX.Element => {
    return (
        <BaseSendSummary amount={amount} fee={fee}>
            <Col gap="3%" style={{ alignSelf: "flex-start" }}>
                <SummaryField label={translate("from")}>{senderName + " - " + formatHash(senderAddress, "middle", 3)}</SummaryField>
                <SummaryField label={translate("to")}>{formatHash(receiverAddress!, "middle", 3)}</SummaryField>
                <SummaryField label={translate("message")}>{message || "-"}</SummaryField>
            </Col>
        </BaseSendSummary>
    );
};

export default SendSummary;
