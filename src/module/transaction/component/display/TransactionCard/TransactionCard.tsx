import { Col, Row, Typography, useModal } from "@peersyst/react-native-components";
import formatDate from "utils/formatDate";
import { TransactionAmountConversion, TransactionCardRoot } from "./TransactionCard.styles";
import TransactionIcon from "module/transaction/component/display/TransactionIcon/TransactionIcon";
import TransactionAmount from "module/transaction/component/display/TransactionAmount/TransactionAmount";
import TransactionLabel from "module/transaction/component/display/TransactionLabel/TransactionLabel";
import { FullTransaction } from "module/common/service/CkbSdkService.types";
import { TouchableWithoutFeedback } from "react-native";
import TransactionDetailsModal from "../../core/TransactionDetailsModal/TransactionDetailsModal";
import { TransactionStatus as TransactionStatusEnum, TransactionType } from "ckb-peersyst-sdk";
import TransactionStatusIndicator from "module/transaction/component/display/TransactionStatusIndicator/TransactionStatusIndicator";
import TransactionStatus from "../TransactionStatus/TransactionStatus";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import { useGetTokenPrice } from "module/token/query/useGetTokenPrice";

export interface TransactionCardProps {
    transaction: FullTransaction;
}

const TransactionCard = ({ transaction }: TransactionCardProps): JSX.Element => {
    const { showModal } = useModal();
    const { fiat } = useRecoilValue(settingsState);
    const { data: tokenValue } = useGetTokenPrice(fiat, "nervos-network");
    const { timestamp, amount, type, token = "CKB", status } = transaction;
    const showAmount = type !== TransactionType.SEND_NFT && type !== TransactionType.RECEIVE_NFT;

    return (
        <TouchableWithoutFeedback onPress={() => showModal(TransactionDetailsModal, { transaction })}>
            <TransactionCardRoot>
                <TransactionIcon type={type} />
                <Col gap={2} flex={1}>
                    <Row justifyContent="space-between">
                        <TransactionLabel variant="body1" fontWeight="bold" type={type} />
                        {showAmount && (
                            <TransactionAmount variant="body1" boldUnits type={type} fontWeight="bold" amount={amount} currency={token} />
                        )}
                    </Row>
                    <Row justifyContent="space-between" alignItems="center">
                        {timestamp ? (
                            <Typography variant="body2" style={{ marginLeft: 10 }}>
                                {formatDate(new Date(timestamp))}
                            </Typography>
                        ) : (
                            <TransactionStatus variant="body2" status={status} style={{ marginLeft: 10 }} />
                        )}
                        {status !== TransactionStatusEnum.COMMITTED ? (
                            <TransactionStatusIndicator status={status} />
                        ) : (
                            showAmount &&
                            tokenValue && (
                                <TransactionAmountConversion type={type} amount={tokenValue * amount} currency={fiat} variant="body2" />
                            )
                        )}
                    </Row>
                </Col>
            </TransactionCardRoot>
        </TouchableWithoutFeedback>
    );
};

export default TransactionCard;
