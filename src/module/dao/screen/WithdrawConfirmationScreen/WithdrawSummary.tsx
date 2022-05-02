import { formatAddress } from "@peersyst/react-utils";
import { translate } from "locale";
import { SummaryText } from "module/transaction/component/display/SummaryField/SummaryField.styles";
import Balance from "module/wallet/component/display/Balance/Balance";
import { convertMiniToCKB } from "module/wallet/utils/convertMiniToCKB";
import { Col } from "react-native-components";
import BaseSendSummary, { BaseSendSummaryProps } from "../../../transaction/component/display/BaseSendSummary/BaseSendSummary";
import SummaryField from "../../../transaction/component/display/SummaryField/SummaryField";

export interface WithdrawSummaryProps extends BaseSendSummaryProps {
    receiverName: string;
    receiverAddress: string;
    depositAPC: number;
    compensation: number;
}

const WithdrawSummary = ({ amount, fee, receiverName, receiverAddress, depositAPC, compensation }: WithdrawSummaryProps): JSX.Element => {
    return (
        <BaseSendSummary amount={amount} fee={fee}>
            <Col gap="3%" style={{ alignSelf: "flex-start" }}>
                <SummaryField label={translate("destination_wallet")}>
                    {receiverName + " - " + formatAddress(receiverAddress, "middle", 3)}
                </SummaryField>
                <SummaryField label={translate("deposit_apc")}>{`${depositAPC}%`}</SummaryField>
                <SummaryField label={translate("compensation")}>
                    <SummaryText
                        as={Balance}
                        style={{ paddingLeft: "5%" }}
                        balance={convertMiniToCKB(compensation)}
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
