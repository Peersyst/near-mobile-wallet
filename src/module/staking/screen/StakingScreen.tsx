import StakingSlider from "module/staking/component/display/StakingSlider/StakingSlider";
import MainGradientScreen from "module/main/component/layout/MainGradientScreen/MainGradientScreen";
import StakingTabs from "module/staking/component/navigation/StakingTabs/StakingTabs";
import Alert from "module/common/component/feedback/Alert/Alert";
import { Typography, useTheme } from "@peersyst/react-native-components";

const StakingScreen = (): JSX.Element => {
    const theme = useTheme();

    return (
        <>
            <Alert
                type="warning"
                content={
                    <Typography variant="body4Strong" color="white">
                        We are currently experiencing unexpected load. Some of the counts may be inaccurate.
                    </Typography>
                }
                style={{
                    height: 65,
                    flex: 0,
                    backgroundColor: theme.palette.status.warning,
                    color: "white",
                    borderRadius: 0,
                    fontWeight: "500",
                }}
            />

            <MainGradientScreen>
                {{
                    slider: <StakingSlider />,
                    content: <StakingTabs />,
                }}
            </MainGradientScreen>
        </>
    );
};

export default StakingScreen;
