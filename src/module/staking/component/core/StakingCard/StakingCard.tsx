import { WalletCardProps } from "module/wallet/component/core/WalletCard/WalletCard";
import BaseWalletCard from "module/common/component/surface/BaseWalletCard/BaseWalletCard";
import StakingCardContent from "module/staking/component/core/StakingCard/StakingCardContent/StakingCardContent";
import StakingCardButtons from "module/staking/component/core/StakingCard/StakingCardButtons/StakingCardButtons";

const StakingCard = ({ wallet }: WalletCardProps): JSX.Element => {
    return (
        <BaseWalletCard wallet={wallet} gap={26}>
            {{
                content: <StakingCardContent wallet={wallet} />,
                button: <StakingCardButtons />,
            }}
        </BaseWalletCard>
    );
};

export default StakingCard;
