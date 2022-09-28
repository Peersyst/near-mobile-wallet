import GradientPage from "module/common/component/layout/GradientPage/GradientPage";
import { GradientPageProps } from "module/common/component/layout/GradientPage/GradientPage.types";
import BaseMainScreen, { BaseMainScreenProps } from "../BaseMainScreen/BaseMainScreen";

type BaseWithBackgroundMainScreenProps = Pick<BaseMainScreenProps, "children"> & Pick<GradientPageProps, "gradient" | "style">;

const BaseWithBackgroundMainScreen = ({ children, style, gradient }: BaseWithBackgroundMainScreenProps): JSX.Element => {
    return (
        <BaseMainScreen>
            <GradientPage style={style} gradient={gradient}>
                {children}
            </GradientPage>
        </BaseMainScreen>
    );
};

export default BaseWithBackgroundMainScreen;
