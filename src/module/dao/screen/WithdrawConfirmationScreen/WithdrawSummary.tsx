import { formatHash } from "@peersyst/react-utils";
import { SummaryText } from "module/transaction/component/display/SummaryField/SummaryField.styles";
import Balance from "module/wallet/component/display/Balance/Balance";
import { Col } from "@peersyst/react-native-components";
import BaseSendSummary, { BaseSendSummaryProps } from "../../../transaction/component/display/BaseSendSummary/BaseSendSummary";
import SummaryField from "../../../transaction/component/display/SummaryField/SummaryField";
import { useTranslate } from "module/common/hook/useTranslate";

export interface WithdrawSummaryProps extends BaseSendSummaryProps {
    receiverName: string;
    receiverAddress: string;
    depositAPC: number;
    compensation: number;
}

const WithdrawSummary = ({ amount, fee, receiverName, receiverAddress, depositAPC, compensation }: WithdrawSummaryProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <BaseSendSummary amount={amount} fee={fee}>
            <Col gap="3%" style={{ alignSelf: "flex-start" }}>
                <SummaryField label={translate("destination_wallet")}>
                    {receiverName + " - " + formatHash(receiverAddress, "middle", 3)}
                </SummaryField>
                <SummaryField label={translate("deposit_apc")}>{`${depositAPC}%`}</SummaryField>
                <SummaryField label={translate("compensation")}>
                    <SummaryText
                        as={Balance}
                        style={{ paddingLeft: "5%" }}
                        balance={compensation}
                        units={"CKB"}
                        variant="body1"
                        boldUnits
                    />
                </SummaryField>
            </Col>
        </BaseSendSummary>
    );
};

export default WithdrawSummary;
