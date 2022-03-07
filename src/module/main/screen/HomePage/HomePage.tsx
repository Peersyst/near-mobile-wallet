import Button from "module/common/component/input/Button/Button";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import Breadcrumbs from "module/common/component/display/Breadcrumbs/Breadcrumbs";
import { useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";

const HomePage = (): JSX.Element => {
    const setWalletState = useSetRecoilState(walletState);

    return (
        <BasePage appearance="light" showIcons>
            <Button onPress={() => setWalletState((state) => ({ ...state, isAuthenticated: false }))}>Log out</Button>
            <Breadcrumbs index={2} length={6} />
        </BasePage>
    );
};

export default HomePage;
