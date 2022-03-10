import PagerView from "module/common/component/layout/PagerView/PagerView";
import AddAccountCard from "module/wallet/component/input/AddAccountCard/AddAccountCard";
import { MAIN_SCREEN_PADDING } from "module/main/MainNavigatorGroup";

const MainSlider = (): JSX.Element => {
    return (
        <PagerView showPageIndicator height="33%" gap={0} pagePadding={{ horizontal: MAIN_SCREEN_PADDING }}>
            <AddAccountCard />
        </PagerView>
    );
};

export default MainSlider;
