import PagerView from "module/common/component/layout/PagerView/PagerView";
import AddAccountCard from "module/wallet/component/input/AddAccountCard/AddAccountCard";
import AccountCard from "module/wallet/component/core/AccountCard/AccountCard";
import useWallet from "module/wallet/hook/useWallet";

const MainSlider = (): JSX.Element => {
    const {
        state: { cells },
        setSelectedAccount,
    } = useWallet();
    return (
        <PagerView
            showPageIndicator
            onPageSelected={({ nativeEvent: { position } }) => position < cells.length && setSelectedAccount(position)}
            height="33%"
            gap={0}
            pagePadding={{ horizontal: 20 }}
            style={{ minHeight: 203 }}
        >
            {cells.map((cell, i) => (
                <AccountCard key={i} cell={cell} />
            ))}
            <AddAccountCard />
        </PagerView>
    );
};

export default MainSlider;
