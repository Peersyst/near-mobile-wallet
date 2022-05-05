import TransactionDetail from "module/transaction/component/core/TransactionDetailsModal/TransactionDetailsBody/TransactionDetail";
import { translate } from "locale";
import { BlockchainAddress, Row, Typography } from "react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import { FullTransaction } from "module/common/service/CkbSdkService.types";
import { TransactionType } from "ckb-peersyst-sdk";

export interface TransactionTypeDetailsProps {
    transaction: FullTransaction;
}

const TransactionTypeDetails = ({ transaction: { type, outputs, inputs } }: TransactionTypeDetailsProps): JSX.Element => {
    if (type === TransactionType.SEND_CKB)
        return (
            <TransactionDetail title={translate("receiver")}>
                {outputs[0] ? (
                    <BlockchainAddress address={outputs[0].address} type="address" variant="body1" length={8} />
                ) : (
                    <Typography variant="body1">{translate("unknown")}</Typography>
                )}
            </TransactionDetail>
        );
    else if (type === TransactionType.RECEIVE_CKB)
        return (
            <TransactionDetail title={translate("senders")}>
                {inputs.length ? (
                    inputs.map((input, key) => (
                        <Row key={key} flex={1} justifyContent="space-between" alignItems="center">
                            <BlockchainAddress address={input.address} type="address" variant="body1" length={6} />
                            <Balance balance={input.quantity} units="CKB" variant="body1" />
                        </Row>
                    ))
                ) : (
                    <Typography variant="body1">{translate("unknown")}</Typography>
                )}
            </TransactionDetail>
        );
    else return <></>;
};

export default TransactionTypeDetails;
