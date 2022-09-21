import { formatHash } from "@peersyst/react-utils";
import { translate } from "locale";
import { Col } from "@peersyst/react-native-components";
import BaseSendSummary, { BaseSendSummaryProps } from "../../../transaction/component/display/BaseSendSummary/BaseSendSummary";
import SummaryField from "../../../transaction/component/display/SummaryField/SummaryField";
import { SummaryText } from "module/transaction/component/display/SummaryField/SummaryField.styles";
import useGetDaoInfo from "module/dao/query/useGetDaoInfo";

export interface DepositSummaryProps extends BaseSendSummaryProps {
    senderName: string;
    senderAddress: string;
}

const DepositSummary = ({ amount, fee, senderName, senderAddress }: DepositSummaryProps): JSX.Element => {
    const { data: { estimated_apc = "0" } = {}, isLoading: loadingDao } = useGetDaoInfo();

    return (
        <BaseSendSummary amount={amount} fee={fee}>
            <>
                <Col gap="3%" style={{ alignSelf: "flex-start" }}>
                    <SummaryField label={translate("from")}>{senderName + " - " + formatHash(senderAddress, "middle", 3)}</SummaryField>
                    <SummaryField label={translate("estimated_apc")}>
                        {loadingDao ? `${translate("loading_apc")}...` : `${estimated_apc}%`}
                    </SummaryField>
                </Col>
                <Col>
                    <SummaryText variant="body2" textAlign="center">
                        <SummaryText variant="body2" fontWeight="bold" textAlign="center">
                            {`${translate("attention")} `}
                        </SummaryText>
                        {translate("deposit_summary_warning")}
                    </SummaryText>
                </Col>
            </>
        </BaseSendSummary>
    );
};

export default DepositSummary;
