import { formatAddress } from "@peersyst/react-utils";
import { translate } from "locale";
import { Col } from "react-native-components";
import BaseSendSummary, { BaseSendSummaryProps } from "../../../transaction/component/display/BaseSendSummary/BaseSendSummary";
import SummaryField from "../../../transaction/component/display/SummaryField/SummaryField";

export interface WithdrawSummaryProps extends BaseSendSummaryProps {
    receiverName: string;
    receiverAddress: string;
    depositAPC: number;
}

const WithdrawSummary = ({ amount, fee, receiverName, receiverAddress, depositAPC }: WithdrawSummaryProps): JSX.Element => {
    return (
        <BaseSendSummary amount={amount} fee={fee}>
            <Col gap="3%" style={{ alignSelf: "flex-start" }}>
                <SummaryField label={translate("destination_wallet")}>
                    {receiverName + " - " + formatAddress(receiverAddress, "middle", 3)}
                </SummaryField>
                <SummaryField label={translate("deposit_apc")}>{`${depositAPC}%`}</SummaryField>
            </Col>
        </BaseSendSummary>
    );
};

export default WithdrawSummary;
