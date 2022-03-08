import PagerView from "module/common/component/layout/PagerView/PagerView";
import AddAccountCard from "module/wallet/component/input/AddAccountCard/AddAccountCard";

const DATA = [
    {
        id: "0",
        title: "First Item",
    },
    {
        id: "1",
        title: "First Item",
    },
];
const MainSlider = (): JSX.Element => {
    return (
        <PagerView showPageIndicator height={230} onPageSelected={(e) => console.log(e)}>
            {DATA.map(() => (
                <AddAccountCard />
            ))}
        </PagerView>
    );
};

export default MainSlider;
