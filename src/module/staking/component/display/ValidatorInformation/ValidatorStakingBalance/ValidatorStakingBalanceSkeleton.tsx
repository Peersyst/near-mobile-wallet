import Typography from "module/common/component/display/Typography/Typography";
import { Col, Skeleton } from "@peersyst/react-native-components";

const ValidatorStakingBalanceSkeleton = (): JSX.Element => {
    return (
        <Col gap={2}>
            <Skeleton width={70}>
                <Typography variant="body3Strong">·</Typography>
            </Skeleton>
            <Skeleton width={70}>
                <Typography variant="body3Strong">·</Typography>
            </Skeleton>
        </Col>
    );
};

export default ValidatorStakingBalanceSkeleton;
