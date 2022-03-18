import BaseMainScreen, { BaseMainScreenProps } from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import { BottomTabScreenNavigatonProps } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup.types";
import CardBackgroundWrapper from "../../surface/CardBackgroundWrapper/CardBackgroundWrapper";

export type BaseSecondaryScreenProps = Partial<BottomTabScreenNavigatonProps> & Omit<BaseMainScreenProps, "onBack">;

const BaseSecondaryScreen = ({ children, title, back, navigation }: BaseSecondaryScreenProps): JSX.Element => {
    const handleBack = () => {
        if(navigation && navigation.canGoBack()){
            navigation.goBack();
        }
    }
    return (
        <BaseMainScreen title={title} back={back} onBack={handleBack}>
            <CardBackgroundWrapper>{children}</CardBackgroundWrapper>
        </BaseMainScreen>
    );
};

export default BaseSecondaryScreen;

