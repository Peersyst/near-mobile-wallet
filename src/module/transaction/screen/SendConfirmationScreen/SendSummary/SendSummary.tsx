import { formatAddress } from "@peersyst/react-utils";
import { translate } from "locale";
import { SendState } from "module/transaction/state/SendState";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import { Wallet } from "module/wallet/state/WalletState";
import { Col } from "react-native-components";
import BaseSendSummary from "../../BaseSendConfirmationScreen/BaseSendSummary/BaseSendSummary";
import SummaryField from "../../BaseSendConfirmationScreen/BaseSendSummary/SummaryField";

type SendSummaryProps = Required<
    Pick<BalanceProps, "balance"> &
        Pick<SendState, "fee" | "receiverAddress" | "message"> & {
            senderName: string;
        }
> &
    Pick<Wallet, "serviceInstance">;

const SendSummary = ({ balance, fee, receiverAddress, message, senderName, serviceInstance }: SendSummaryProps): JSX.Element => {
    return (
        <BaseSendSummary balance={balance} fee={fee}>
            <Col gap="3%" style={{ alignSelf: "flex-start" }}>
                <SummaryField label={translate("from")}>
                    {senderName + " - " + formatAddress(serviceInstance?.getAddress() || "", "middle", 3)}
                </SummaryField>
                <SummaryField label={translate("to")}>{formatAddress(receiverAddress!, "middle", 3)}</SummaryField>
                <SummaryField label={translate("message")}>{message || "-"}</SummaryField>
            </Col>
        </BaseSendSummary>
    );
};

export default SendSummary;
