import { formatAddress } from "@peersyst/react-utils";
import { translate } from "locale";
import useGetDAOBalance from "module/dao/query/useGetDAOBalance";
import { Col } from "react-native-components";
import BaseSendSummary, { BaseSendSummaryProps } from "../../../transaction/component/display/BaseSendSummary/BaseSendSummary";
import SummaryField from "../../../transaction/component/display/SummaryField/SummaryField";
import { SummaryText } from "module/transaction/component/display/SummaryField/SummaryField.styles";

export interface DepositSummaryProps extends BaseSendSummaryProps {
    senderName: string;
    senderAddress: string;
}

const DepositSummary = ({ amount, fee, senderName, senderAddress }: DepositSummaryProps): JSX.Element => {
    const { data: daoBalance } = useGetDAOBalance();
    const currentAPC = daoBalance?.daoCompensation;
    return (
        <BaseSendSummary amount={amount} fee={fee}>
            <Col gap="3%" style={{ alignSelf: "flex-start" }}>
                <SummaryField label={translate("from")}>{senderName + " - " + formatAddress(senderAddress, "middle", 3)}</SummaryField>
                <SummaryField label={translate("estimated_apc")}>
                    {currentAPC !== undefined ? `${currentAPC}%` : `${translate("loading_apc")}...`}
                </SummaryField>
                <SummaryText variant="body1" textAlign="center">
                    <SummaryText variant="body1" fontWeight="bold">
                        {`${translate("attention")} `}
                    </SummaryText>
                    {translate("deposit_summary_warning")}
                </SummaryText>
            </Col>
        </BaseSendSummary>
    );
};

export default DepositSummary;
