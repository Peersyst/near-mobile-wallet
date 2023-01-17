import { WalletCardProps } from "module/wallet/component/core/WalletCard/WalletCard";
import BaseWalletCard from "module/common/component/surface/BaseWalletCard/BaseWalletCard";
import StakingCardButtons from "./StakingCardButtons/StakingCardButtons";
import StakingCardContent from "./StakingCardContent/StakingCardContent";

const StakingCard = ({ wallet }: WalletCardProps): JSX.Element => {
    return (
        <BaseWalletCard wallet={wallet} gap={26}>
            {{
                content: <StakingCardContent wallet={wallet} />,
                footer: <StakingCardButtons />,
            }}
        </BaseWalletCard>
    );
};

export default StakingCard;
