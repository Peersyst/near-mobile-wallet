import PagerView from "module/common/component/layout/PagerView/PagerView";
import AddAccountCard from "module/wallet/component/input/AddAccountCard/AddAccountCard";
import walletState from "module/wallet/state/WalletState";
import { useRecoilValue } from "recoil";
import AccountCard from "module/wallet/component/core/AccountCard/AccountCard";

const MainSlider = (): JSX.Element => {
    const { cells } = useRecoilValue(walletState);
    return (
        <PagerView showPageIndicator height="33%" gap={0} pagePadding={{ horizontal: 20 }} style={{ minHeight: 203 }}>
            {cells.map((cell, i) => (
                <AccountCard key={i} colorIndex={i} cell={cell} />
            ))}
            <AddAccountCard />
        </PagerView>
    );
};

export default MainSlider;
