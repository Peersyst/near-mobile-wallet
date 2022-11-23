import { formatHash } from "@peersyst/react-utils";
import { Col } from "@peersyst/react-native-components";
import BaseSendSummary, { BaseSendSummaryProps } from "../../../transaction/component/display/BaseSendSummary/BaseSendSummary";
import SummaryField from "../../../transaction/component/display/SummaryField/SummaryField";
import useGetDaoInfo from "module/dao/query/useGetDaoInfo";
import { useTranslate } from "module/common/hook/useTranslate";
import Typography from "module/common/component/display/Typography/Typography";

export interface DepositSummaryProps extends Omit<BaseSendSummaryProps, "token"> {
    senderName: string;
    senderAddress: string;
}

const DepositSummary = ({ amount, fee, senderName, senderAddress }: DepositSummaryProps): JSX.Element => {
    const { data: { estimated_apc = "0" } = {}, isLoading: loadingDao } = useGetDaoInfo();
    const translate = useTranslate();
    return (
        <BaseSendSummary amount={amount} fee={fee} token="token">
            <>
                <Col gap="3%" style={{ alignSelf: "flex-start" }}>
                    <SummaryField label={translate("from")}>{senderName + " - " + formatHash(senderAddress, "middle", 3)}</SummaryField>
                    <SummaryField label={translate("estimated_apc")}>
                        {loadingDao ? `${translate("loading_apc")}...` : `${estimated_apc}%`}
                    </SummaryField>
                </Col>
                <Col>
                    <Typography variant="body2" textAlign="center">
                        <Typography variant="body2" fontWeight="bold" textAlign="center">
                            {`${translate("attention")} `}
                        </Typography>
                        {translate("deposit_summary_warning")}
                    </Typography>
                </Col>
            </>
        </BaseSendSummary>
    );
};

export default DepositSummary;
