import { SlashIcon } from "icons";
import { Row } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import useGetTotalStaking from "module/staking/query/useGetTotalStaking";
import useGetBalance from "module/wallet/query/useGetBalance";
import { Wallet } from "module/wallet/state/WalletState";
import StakingInfoLabel from "../../StakingInfoLabel/StakingInfoLabel";

interface StakingCardContentProps {
    wallet: Wallet;
}

const StakingCardContent = ({ wallet }: StakingCardContentProps): JSX.Element => {
    const translate = useTranslate();
    const { isLoading: isStakingLoading, data: { staked } = { staked: "0" } } = useGetTotalStaking(wallet.index, true);
    const { isLoading: isBalanceLoading, data: { available } = { available: "0" } } = useGetBalance(wallet.index, true);

    const availableLabel = translate("available");
    const stakedLabel = translate("staked");

    return (
        <Row style={{ marginTop: 6 }} alignItems="center" gap={16}>
            <StakingInfoLabel loading={isBalanceLoading} amount={available} label={availableLabel} />
            <SlashIcon />
            <StakingInfoLabel loading={isStakingLoading} amount={staked} label={stakedLabel} />
        </Row>
    );
};

export default StakingCardContent;
