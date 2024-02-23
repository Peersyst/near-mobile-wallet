import BaseWalletCardSkeleton from "module/common/component/surface/BaseWalletCard/BaseWalletCardSkeleton";
import StakingCardContentSkeleton from "./StakingCardContent/StakingCardContentSkeleton";
import StakingCardButtonsSkeleton from "./StakingCardButtons/StakingCardButtonsSkeleton";

const StakingCardSkeleton = (): JSX.Element => {
    return (
        <BaseWalletCardSkeleton gap={26}>
            {{
                content: <StakingCardContentSkeleton />,
                footer: <StakingCardButtonsSkeleton />,
            }}
        </BaseWalletCardSkeleton>
    );
};

export default StakingCardSkeleton;
