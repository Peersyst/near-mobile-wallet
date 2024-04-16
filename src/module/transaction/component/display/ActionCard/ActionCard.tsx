import { Col, Row } from "@peersyst/react-native-components";
import { ActionCardProps } from "./ActionCard.types";
import ActionIcon from "../ActionIcon/ActionIcon";
import Typography from "module/common/component/display/Typography/Typography";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import useFormatDate from "module/common/hook/useFormatDate";
import ActionLabel from "../ActionLabel/ActionLabel";
import ActionAmount from "module/transaction/component/display/ActionAmount/ActionAmount";
import getAmountAndTokenNameFromAction from "./utils/getAmountAndTokenNameFromAction";
import FiatBalance from "module/wallet/component/display/FiatBalance/FiatBalance";
import { TouchableWithoutFeedback } from "react-native";
import { useModal } from "@peersyst/react-native-components";
import ActionDetailsModal from "../../core/ActionDetailsModal/ActionDetailsModal";

const ActionCard = ({ action }: ActionCardProps): JSX.Element => {
    const {
        actionKind,
        transaction: { blockTimestamp },
    } = action;
    const { amount, tokenName } = getAmountAndTokenNameFromAction(action) || {};
    const formatDate = useFormatDate();
    const { showModal } = useModal();

    const handlePress = () => {
        showModal(ActionDetailsModal, { action });
    };
    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <MainListCard gap="4%" alignItems="center">
                <ActionIcon type={actionKind} />
                <Col gap={2} flex={1}>
                    <Row justifyContent="space-between">
                        <ActionLabel style={{ flex: 1 }} variant="body3Strong" action={action} numberOfLines={amount ? 1 : 2} />
                        {amount !== undefined && (
                            <Row style={{ maxWidth: "45%" }} justifyContent="flex-end">
                                <ActionAmount variant="body3Strong" actionKind={actionKind} amount={amount} units={tokenName} />
                            </Row>
                        )}
                    </Row>
                    <Row justifyContent="space-between" alignItems="center">
                        <Typography variant="body4Strong" color="gray.300">
                            {formatDate(Number(blockTimestamp))}
                        </Typography>
                        {amount && <FiatBalance color="gray.300" balance={amount} variant="body4Strong" />}
                    </Row>
                </Col>
            </MainListCard>
        </TouchableWithoutFeedback>
    );
};

export default ActionCard;
