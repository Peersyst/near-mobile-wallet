import { formatAddress } from "@peersyst/react-utils";
import { translate } from "locale";
import useGetDaoBalance from "module/dao/query/useGetDaoBalance";
import { SendState } from "module/transaction/state/SendState";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import { Wallet } from "module/wallet/state/WalletState";
import { Col } from "react-native-components";

import BaseSendSummary from "../../BaseSendConfirmationScreen/BaseSendSummary/BaseSendSummary";
import SummaryField from "../../BaseSendConfirmationScreen/BaseSendSummary/SummaryField";
import { SummaryText } from "../../BaseSendConfirmationScreen/BaseSendSummary/SummaryFiels.styles";

type SendSummaryProps = Required<
    Pick<BalanceProps, "balance"> &
        Pick<SendState, "fee"> & {
            senderName: string;
        }
> &
    Pick<Wallet, "serviceInstance">;

const DepositSummary = ({ balance, fee, senderName, serviceInstance }: SendSummaryProps): JSX.Element => {
    const { data: daoBalance } = useGetDaoBalance();
    const currentAPC = daoBalance?.currentAPC;
    return (
        <BaseSendSummary balance={balance} fee={fee}>
            <Col gap="3%" style={{ alignSelf: "flex-start" }}>
                <SummaryField label={translate("from")}>
                    {senderName + " - " + formatAddress(serviceInstance?.getAddress() || "", "middle", 3)}
                </SummaryField>
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
