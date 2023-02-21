import GradientPage from "module/common/component/layout/GradientPage/GradientPage";
import BaseMainScreen, { BaseMainScreenProps } from "../BaseMainScreen/BaseMainScreen";
import { GradientPageProps } from "module/common/component/layout/GradientPage/GradientPage.types";
import useWalletGradient from "module/wallet/hook/useWalletGradient";

type BaseWithBackgroundMainScreenProps = Pick<BaseMainScreenProps, "children"> &
    Pick<GradientPageProps, "gradient" | "style"> & {
        gradientIndex?: number;
    };

const BaseMainGradientScreen = ({ children, gradient = true, gradientIndex, style }: BaseWithBackgroundMainScreenProps): JSX.Element => {
    const [startColor, endColor] = useWalletGradient(gradientIndex);
    return (
        <BaseMainScreen>
            <GradientPage gradient={gradient} style={{ backgroundColor: startColor, secondaryBackgroundColor: endColor, ...style }}>
                {children}
            </GradientPage>
        </BaseMainScreen>
    );
};

export default BaseMainGradientScreen;
