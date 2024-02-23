import { Col, Row, Skeleton } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import ActionIcon from "module/transaction/component/display/ActionIcon/ActionIcon";
import { TransactionActionKind } from "near-peersyst-sdk";
import { StakingDetailRoot } from "./StakingDetailCard.styles";

const StakingDetailCardSkeleton = (): JSX.Element => {
    return (
        <StakingDetailRoot flex={1} gap={12} justifyContent="space-between" alignItems="center">
            <Row gap={12} alignItems="center">
                <Skeleton shape="circular">
                    <ActionIcon type={TransactionActionKind.STAKE} />
                </Skeleton>
                <Col gap={3}>
                    <Skeleton width="200%">
                        <Typography variant="body3Regular">·</Typography>
                    </Skeleton>
                    <Skeleton width={70}>
                        <Typography variant="body3Strong">·</Typography>
                    </Skeleton>
                    <Skeleton width={50}>
                        <Typography variant="body4Strong">·</Typography>
                    </Skeleton>
                </Col>
            </Row>
        </StakingDetailRoot>
    );
};

export default StakingDetailCardSkeleton;
