import BaseWalletCardSkeleton from "module/common/component/surface/BaseWalletCard/BaseWalletCardSkeleton";
import { Skeleton, Typography } from "@peersyst/react-native-components";
import WalletCardButtonsSkeleton from "./WalletCardButtons/WalletCardButtonsSkeleton";

const WalletCardSkeleton = (): JSX.Element => {
    return (
        <BaseWalletCardSkeleton gap={20}>
            {{
                content: (
                    <Skeleton width="80%">
                        <Typography variant="h3Strong">·</Typography>
                    </Skeleton>
                ),
                footer: <WalletCardButtonsSkeleton />,
            }}
        </BaseWalletCardSkeleton>
    );
};

export default WalletCardSkeleton;
