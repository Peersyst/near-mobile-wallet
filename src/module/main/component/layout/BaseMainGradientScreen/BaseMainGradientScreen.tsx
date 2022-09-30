import GradientPage from "module/common/component/layout/GradientPage/GradientPage";
import BaseMainScreen, { BaseMainScreenProps } from "../BaseMainScreen/BaseMainScreen";
import { GradientPageProps } from "module/common/component/layout/GradientPage/GradientPage.types";

type BaseWithBackgroundMainScreenProps = Pick<BaseMainScreenProps, "children"> & Pick<GradientPageProps, "gradient" | "style">;

const BaseMainGradientScreen = ({ children, gradient = true, style }: BaseWithBackgroundMainScreenProps): JSX.Element => {
    return (
        <BaseMainScreen>
            <GradientPage gradient={gradient} style={style}>
                {children}
            </GradientPage>
        </BaseMainScreen>
    );
};

export default BaseMainGradientScreen;
