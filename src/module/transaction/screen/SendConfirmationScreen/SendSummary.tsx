import { Col } from "@peersyst/react-native-components";
import BaseSendSummary, { BaseSendSummaryProps } from "../../component/display/BaseSendSummary/BaseSendSummary";
import SummaryField from "../../component/display/SummaryField/SummaryField";
import { useTranslate } from "module/common/hook/useTranslate";
import BlockchainAddress from "module/common/component/display/BlockchainAddress/BlockchainAddress";

export interface SendSummaryProps extends BaseSendSummaryProps {
    senderAccount: string;
    receiverAccount: string;
}

const SendSummary = ({ senderAccount, receiverAccount, ...rest }: SendSummaryProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <BaseSendSummary {...rest}>
            <Col gap="8%" style={{ alignSelf: "flex-start" }}>
                <SummaryField label={translate("from")}>
                    <BlockchainAddress type="address" variant="body2Strong" address={senderAccount} />
                </SummaryField>
                <SummaryField label={translate("to")}>
                    <BlockchainAddress type="address" variant="body2Strong" address={receiverAccount} />
                </SummaryField>
            </Col>
        </BaseSendSummary>
    );
};

export default SendSummary;
