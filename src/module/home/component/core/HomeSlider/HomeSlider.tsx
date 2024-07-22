import WalletSlider from "module/wallet/component/core/WalletSlider/WalletSlider";
import WalletCard from "module/wallet/component/core/WalletCard/WalletCard";
import WalletCardSkeleton from "module/wallet/component/core/WalletCard/WalletCardSkeleton";

const HomeSlider = (): JSX.Element => {
    return <WalletSlider Card={WalletCard} Skeleton={WalletCardSkeleton} />;
};

export default HomeSlider;
