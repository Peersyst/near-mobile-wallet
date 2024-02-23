import { SlashIcon } from "icons";
import { Row } from "@peersyst/react-native-components";
import StakingInfoLabelSkeleton from "../../StakingInfoLabel/StakingInfoLabelSkeleton";

const StakingCardContentSkeleton = (): JSX.Element => {
    return (
        <Row style={{ marginTop: 6 }} alignItems="center" gap={16}>
            <StakingInfoLabelSkeleton />
            <SlashIcon />
            <StakingInfoLabelSkeleton />
        </Row>
    );
};

export default StakingCardContentSkeleton;
