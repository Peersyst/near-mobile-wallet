import { Col, Row, useModal } from "@peersyst/react-native-components";
import formatDate from "utils/formatDate";
import { TransactionCardRoot } from "./TransactionCard.styles";
import TransactionAmount from "module/transaction/component/display/TransactionAmount/TransactionAmount";
import TransactionLabel from "module/transaction/component/display/TransactionLabel/TransactionLabel";
import TransactionDetailsModal from "../../core/TransactionDetailsModal/TransactionDetailsModal";
import { TransactionStatus as TransactionStatusEnum, TransactionType } from "ckb-peersyst-sdk";
import TransactionStatusIndicator from "module/transaction/component/display/TransactionStatusIndicator/TransactionStatusIndicator";
import TransactionStatus from "../TransactionStatus/TransactionStatus";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import { useGetTokenPrice } from "module/token/query/useGetTokenPrice";
import { TransactionCardProps } from "./TransactionCard.types";
import { TouchableWithoutFeedback } from "react-native";
import TransactionIcon from "../TransactionIcon/TransactionIcon";
import Typography from "module/common/component/display/Typography/Typography";
import Balance from "module/wallet/component/display/Balance/Balance";

const TransactionCard = ({ transaction, last = false }: TransactionCardProps): JSX.Element => {
    const { showModal } = useModal();
    const { fiat } = useRecoilValue(settingsState);
    const { data: tokenValue } = useGetTokenPrice(fiat, "nervos-network");
    const { timestamp, amount, type, token = "CKB", status } = transaction;
    const showAmount = type !== TransactionType.SEND_NFT && type !== TransactionType.RECEIVE_NFT;

    return (
        <TouchableWithoutFeedback onPress={() => showModal(TransactionDetailsModal, { transaction })}>
            <TransactionCardRoot last={last}>
                <TransactionIcon type={type} />
                <Col gap={2} flex={1}>
                    <Row justifyContent="space-between">
                        <TransactionLabel variant="body3Strong" type={type} />
                        {showAmount && <TransactionAmount variant="body3Strong" type={type} balance={amount} units={token} />}
                    </Row>
                    <Row justifyContent="space-between" alignItems="center">
                        {timestamp ? (
                            <Typography variant="body4Strong" color={(p) => p.gray[300]}>
                                {formatDate(new Date(timestamp))}
                            </Typography>
                        ) : (
                            <TransactionStatus variant="body2" status={status} />
                        )}
                        {status !== TransactionStatusEnum.COMMITTED ? (
                            <TransactionStatusIndicator status={status} />
                        ) : (
                            showAmount &&
                            tokenValue && (
                                <Balance
                                    options={{ maxDecimals: 2 }}
                                    action="round"
                                    color={(p) => p.gray[300]}
                                    balance={tokenValue * amount}
                                    units={fiat}
                                    variant="body4Strong"
                                />
                            )
                        )}
                    </Row>
                </Col>
            </TransactionCardRoot>
        </TouchableWithoutFeedback>
    );
};

export default TransactionCard;
