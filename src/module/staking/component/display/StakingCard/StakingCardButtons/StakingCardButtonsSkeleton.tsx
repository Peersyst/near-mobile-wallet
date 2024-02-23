import Button from "module/common/component/input/Button/Button";
import { Skeleton } from "@peersyst/react-native-components";

const StakingCardButtonsSkeleton = (): JSX.Element => {
    return (
        <Skeleton width={272}>
            <Button style={{ width: 272 }} size="md" />
        </Skeleton>
    );
};

export default StakingCardButtonsSkeleton;
