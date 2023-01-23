import Balance from "module/wallet/component/display/Balance/Balance";
import { StakingBalance } from "module/sdk";
import Typography from "module/common/component/display/Typography/Typography";
import { useTranslate } from "module/common/hook/useTranslate";

export interface ValidatorStakingBalanceProps {
    stakingBalance: StakingBalance | undefined;
    stakingBalanceType: keyof StakingBalance;
}

const ValidatorStakingBalance = ({ stakingBalance, stakingBalanceType = "staked" }: ValidatorStakingBalanceProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <>
            <Typography textAlign="right" variant="body3Strong" light>
                {translate("staking")}
            </Typography>
            {stakingBalance && (
                <Balance style={{ maxWidth: 100 }} balance={stakingBalance[stakingBalanceType]!} variant="body3Strong" units="token" />
            )}
        </>
    );
};

export default ValidatorStakingBalance;
