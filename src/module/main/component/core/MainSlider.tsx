import PagerView from "module/common/component/layout/PagerView/PagerView";
import AddAccountCard from "module/wallet/component/input/AddAccountCard/AddAccountCard";
import walletState from "module/wallet/state/WalletState";
import { useRecoilValue } from "recoil";

const MainSlider = (): JSX.Element => {
    const { hasWallet, accounts } = useRecoilValue(walletState);
    return (
        <PagerView showPageIndicator height={250} gap={0}>
            {hasWallet ? accounts.map((_, i) => <AddAccountCard key={i} />) : <AddAccountCard />}
        </PagerView>
    );
};

export default MainSlider;
