import { Col, Skeleton } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import NftImage from "../NftImage/NftImage";

const NftCardSkeleton = (): JSX.Element => {
    return (
        <MainListCard gap="6.5%" alignItems="center">
            <Skeleton>
                <NftImage uri="unknown" />
            </Skeleton>
            <Col flex={1} gap={12} justifyContent="center">
                <Col gap={2} flex={1} justifyContent="center">
                    <Skeleton width="100%">
                        <Typography variant="body1Strong">·</Typography>
                    </Skeleton>
                    <Skeleton width="50%">
                        <Typography variant="body3Strong">·</Typography>
                    </Skeleton>
                </Col>
                <Col flex={1} gap={2}>
                    <Skeleton width={70}>
                        <Typography variant="body4Strong">·</Typography>
                    </Skeleton>
                    <Skeleton width={70}>
                        <Typography variant="body4Strong">·</Typography>
                    </Skeleton>
                </Col>
            </Col>
        </MainListCard>
    );
};

export default NftCardSkeleton;
