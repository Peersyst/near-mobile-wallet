import { BaseWalletCardRoot } from "module/common/component/surface/BaseWalletCard/BaseWalletCard.styles";
import Account from "module/wallet/component/display/Account/Account";
import { WalletCardProps } from "module/wallet/component/core/WalletCard/WalletCard";
import { Row, useModal } from "@peersyst/react-native-components";
import StakingInfoLabel from "module/staking/component/core/StakingInfoLabel/StakingInfoLabel";
import config from "config/config";
import { useTranslate } from "module/common/hook/useTranslate";
import useGetTotalStaking from "module/staking/query/useGetTotalStaking";
import Button from "module/common/component/input/Button/Button";
import { SlashIcon } from "icons";
import StakeModal from "module/staking/component/core/StakeModal/StakeModal";
import useGetBalance from "module/wallet/query/useGetBalance";

const StakingCard = ({ wallet: { account, index, imported } }: WalletCardProps): JSX.Element => {
    const translate = useTranslate();
    const { isLoading, data: { staked } = { staked: 0 } } = useGetTotalStaking(index);
    const { data: { available } = { available: "0" } } = useGetBalance();
    const { showModal } = useModal();

    return (
        <BaseWalletCardRoot gap={16}>
            <Account imported={imported} address={account} variant="body2Strong" />
            <Row alignItems="center" gap={16}>
                <StakingInfoLabel loading={isLoading} amount={available} label={config.tokenName + " " + translate("available")} />
                <SlashIcon />
                <StakingInfoLabel loading={isLoading} amount={staked} label={config.tokenName + " " + translate("staked")} />
            </Row>
            <Row>
                <Button style={{ width: 272 }} variant="secondary" size="md" onPress={() => showModal(StakeModal)}>
                    {translate("stakeMyTokens")}
                </Button>
            </Row>
        </BaseWalletCardRoot>
    );
};

export default StakingCard;
