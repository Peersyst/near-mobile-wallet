import { Col, Skeleton, Typography } from "@peersyst/react-native-components";

const StakingInfoLabelSkeleton = (): JSX.Element => {
    return (
        <Col flex={1} gap={2} justifyContent="center" style={{ width: "50%" }}>
            <Skeleton width="100%">
                <Typography variant="h4Strong">·</Typography>
            </Skeleton>
            <Skeleton width="100%">
                <Typography variant="body3Strong">·</Typography>
            </Skeleton>
        </Col>
    );
};

export default StakingInfoLabelSkeleton;
