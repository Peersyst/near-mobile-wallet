import { Col, Row, Skeleton } from "@peersyst/react-native-components";
import ActionIcon from "../ActionIcon/ActionIcon";
import Typography from "module/common/component/display/Typography/Typography";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import { TransactionActionKind } from "near-peersyst-sdk";

const ActionCardSkeleton = (): JSX.Element => {
    return (
        <MainListCard gap="4%" alignItems="center">
            <Skeleton shape="circular">
                <ActionIcon type={TransactionActionKind.ADD_KEY} />
            </Skeleton>
            <Col gap={2} flex={1}>
                <Row justifyContent="space-between">
                    <Skeleton width="50%">
                        <Typography variant="body3Strong">·</Typography>
                    </Skeleton>
                    <Skeleton width={70}>
                        <Typography variant="body3Strong">·</Typography>
                    </Skeleton>
                </Row>
                <Row justifyContent="space-between" alignItems="center">
                    <Skeleton width="35%">
                        <Typography variant="body4Strong">·</Typography>
                    </Skeleton>
                    <Skeleton width={45}>
                        <Typography variant="body4Strong">·</Typography>
                    </Skeleton>
                </Row>
            </Col>
        </MainListCard>
    );
};

export default ActionCardSkeleton;
