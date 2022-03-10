import Button from "module/common/component/input/Button/Button";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import { useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import { Col } from "react-native-components";
import MainSlider from "module/main/component/core/MainSlider";
import { MAIN_SCREEN_PADDING } from "module/main/MainNavigatorGroup";

const HomePage = (): JSX.Element => {
    const setWalletState = useSetRecoilState(walletState);
    return (
        <BasePage appearance="light" showIcons>
            <MainSlider />
            <Col style={{ paddingHorizontal: MAIN_SCREEN_PADDING }}>
                <Button onPress={() => setWalletState((state) => ({ ...state, isAuthenticated: false }))}>Log out</Button>
                <Button
                    onPress={async () => {
                        await WalletStorage.clear();
                        setWalletState({ hasWallet: false, isAuthenticated: false, isFirstTime: false, accounts: [] });
                    }}
                >
                    Erase
                </Button>
            </Col>
        </BasePage>
    );
};

export default HomePage;
