import { formatAddress } from "@peersyst/react-utils";
import { translate } from "locale";
import { SendState } from "module/transaction/state/SendState";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import { Wallet } from "module/wallet/state/WalletState";
import { Col } from "react-native-components";
import BaseSendSummary from "./BaseSendSummary";
import SummaryField from "./SummaryField";

type SendSummaryProps = Required<
    Pick<BalanceProps, "balance"> &
        Pick<SendState, "fee"> & {
            senderName: string;
        }
> &
    Pick<Wallet, "serviceInstance">;

const DepositSummary = ({ balance, fee, senderName, serviceInstance }: SendSummaryProps): JSX.Element => {
    return (
        <BaseSendSummary balance={balance} fee={fee}>
            <Col gap="3%" style={{ alignSelf: "flex-start" }}>
                <SummaryField label={translate("from")}>
                    {senderName + " - " + formatAddress(serviceInstance?.getAddress() || "", "middle", 3)}
                </SummaryField>
                <SummaryField label={translate("estimated_apc")}>
                    {senderName + " - " + formatAddress(serviceInstance?.getAddress() || "", "middle", 3)}
                </SummaryField>
                
            </Col>
        </BaseSendSummary>
    );
};

export default DepositSummary;
