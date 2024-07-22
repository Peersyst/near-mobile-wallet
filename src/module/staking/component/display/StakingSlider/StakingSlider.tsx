import WalletSlider from "module/wallet/component/core/WalletSlider/WalletSlider";
import StakingCard from "../StakingCard/StakingCard";
import StakingCardSkeleton from "../StakingCard/StakingCardSkeleton";

const StakingSlider = (): JSX.Element => {
    return <WalletSlider Card={StakingCard} Skeleton={StakingCardSkeleton} />;
};

export default StakingSlider;
