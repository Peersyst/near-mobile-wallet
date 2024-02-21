import { Row, Skeleton } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";

const WalletCardButtonsSkeleton = (): JSX.Element => {
    return (
        <Row gap={8}>
            <Skeleton width={110}>
                <Button size="md" />
            </Skeleton>
            <Skeleton width={110}>
                <Button size="md" />
            </Skeleton>
            <Skeleton width={110}>
                <Button size="md" />
            </Skeleton>
        </Row>
    );
};

export default WalletCardButtonsSkeleton;
