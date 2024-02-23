import { Col, Row, Skeleton } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import TokenIcon from "../TokenIcon/TokenIcon";

const TokenCardSkeleton = (): JSX.Element => {
    return (
        <MainListCard alignItems="center" justifyContent="space-between">
            <Row alignItems="center" gap={16}>
                <Skeleton shape="circular">
                    <TokenIcon />
                </Skeleton>
                <Skeleton width="50%">
                    <Typography variant="body3Strong">·</Typography>
                </Skeleton>
            </Row>
            <Col alignItems="flex-end" justifyContent="center" gap={2} flex={1}>
                <Skeleton width={70}>
                    <Typography variant="body3Strong">·</Typography>
                </Skeleton>
                <Skeleton width={45}>
                    <Typography variant="body4Strong">·</Typography>
                </Skeleton>
            </Col>
        </MainListCard>
    );
};

export default TokenCardSkeleton;
