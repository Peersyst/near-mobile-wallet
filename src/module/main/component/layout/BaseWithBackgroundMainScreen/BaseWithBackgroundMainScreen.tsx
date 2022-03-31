import BaseMainScreen, { BaseMainScreenProps } from "../BaseMainScreen/BaseMainScreen";
import { MainScreenBackground } from "./BaseWithBackgrounMainScreen.styles";

type BaseWithBackgroundMainScreenProps = Pick<BaseMainScreenProps, "children">;

const BaseWithBackgroundMainScreen = ({ children }: BaseWithBackgroundMainScreenProps): JSX.Element => {
    return (
        <BaseMainScreen>
            <MainScreenBackground />
            {children}
        </BaseMainScreen>
    );
};

export default BaseWithBackgroundMainScreen;
