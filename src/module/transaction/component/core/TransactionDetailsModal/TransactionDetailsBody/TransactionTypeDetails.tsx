import TransactionDetail from "module/transaction/component/core/TransactionDetailsModal/TransactionDetailsBody/TransactionDetail";
import { Row, Typography } from "@peersyst/react-native-components";
import Balance from "module/wallet/component/display/Balance/Balance";
import { TransactionType, FullTransaction } from "near-peersyst-sdk";
import BlockchainAddress from "module/common/component/display/BlockchainAddress/BlockchainAddress";
import { useTranslate } from "module/common/hook/useTranslate";

export interface TransactionTypeDetailsProps {
    transaction: FullTransaction;
}

const TransactionTypeDetails = ({ transaction: { type, outputs, inputs } }: TransactionTypeDetailsProps): JSX.Element => {
    const translate = useTranslate();
    if (type === TransactionType.SEND_NATIVE_TOKEN)
        return (
            <TransactionDetail title={translate("receiver")}>
                {outputs[0] ? (
                    <BlockchainAddress address={outputs[0].address} type="address" variant="body3Regular" length={8} />
                ) : (
                    <Typography variant="body3Regular">{translate("unknown")}</Typography>
                )}
            </TransactionDetail>
        );
    else if (type === TransactionType.RECEIVE_NATIVE_TOKEN)
        return (
            <TransactionDetail title={translate("senders")}>
                {inputs.length ? (
                    inputs.map((input, key) => (
                        <Row key={key} flex={1} justifyContent="space-between" alignItems="center">
                            <BlockchainAddress address={input.address} type="address" variant="body3Regular" length={6} />
                            <Balance
                                options={{ maximumFractionDigits: 2 }}
                                balance={
                                    outputs.reduce((prev, curr) => (curr.address === input.address ? prev + curr.quantity : prev), 0) -
                                    input.quantity
                                }
                                units="token"
                                variant="body3Regular"
                            />
                        </Row>
                    ))
                ) : (
                    <Typography variant="body3Regular">{translate("unknown")}</Typography>
                )}
            </TransactionDetail>
        );
    else return <></>;
};

export default TransactionTypeDetails;
