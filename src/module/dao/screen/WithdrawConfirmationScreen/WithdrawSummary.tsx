import { formatHash } from "@peersyst/react-utils";
import Balance from "module/wallet/component/display/Balance/Balance";
import { Col } from "@peersyst/react-native-components";
import BaseSendSummary, { BaseSendSummaryProps } from "../../../transaction/component/display/BaseSendSummary/BaseSendSummary";
import SummaryField from "../../../transaction/component/display/SummaryField/SummaryField";
import { useTranslate } from "module/common/hook/useTranslate";

export interface WithdrawSummaryProps extends Omit<BaseSendSummaryProps, "token"> {
    receiverName: string;
    receiverAddress: string;
    depositAPC: number;
    compensation: number;
}

const WithdrawSummary = ({ amount, fee, receiverName, receiverAddress, depositAPC, compensation }: WithdrawSummaryProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <BaseSendSummary amount={amount} fee={fee} token="token">
            <Col gap="3%" style={{ alignSelf: "flex-start" }}>
                <SummaryField label={translate("destination_wallet")}>
                    {receiverName + " - " + formatHash(receiverAddress, "middle", 3)}
                </SummaryField>
                <SummaryField label={translate("deposit_apc")}>{`${depositAPC}%`}</SummaryField>
                <SummaryField label={translate("compensation")}>
                    <Balance balance={compensation} variant="body1" />
                </SummaryField>
            </Col>
        </BaseSendSummary>
    );
};

export default WithdrawSummary;
