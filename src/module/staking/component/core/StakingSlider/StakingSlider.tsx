import WalletSlider from "module/wallet/component/core/WalletSlider/WalletSlider";
import StakingCard from "module/staking/component/core/StakingCard/StakingCard";

const StakingSlider = (): JSX.Element => {
    return <WalletSlider Card={StakingCard} />;
};

export default StakingSlider;
