import GradientPage from "module/common/component/layout/GradientPage/GradientPage";
import BaseMainScreen, { BaseMainScreenProps } from "../BaseMainScreen/BaseMainScreen";

type BaseWithBackgroundMainScreenProps = Pick<BaseMainScreenProps, "children">;

const BaseWithBackgroundMainScreen = ({ children }: BaseWithBackgroundMainScreenProps): JSX.Element => {
    return (
        <BaseMainScreen>
            <GradientPage>{children}</GradientPage>
        </BaseMainScreen>
    );
};

export default BaseWithBackgroundMainScreen;
