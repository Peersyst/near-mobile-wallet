import PagerView from "module/common/component/layout/PagerView/PagerView";
import AccountCard from "module/wallet/component/core/AccountCard/AccountCard";
import walletState from "module/wallet/state/WalletState";
import { useRecoilValue } from "recoil";

const MainSlider = (): JSX.Element => {
    const { hasWallet, cells } = useRecoilValue(walletState);
    return (
        <PagerView showPageIndicator height={250} gap={0}>
            {hasWallet ? cells.map((cell, i) => <AccountCard key={i} colorIndex={i} cell={cell} />) : <AddAccountCard />}
        </PagerView>
    );
};

export default MainSlider;
