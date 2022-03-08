import Button from "module/common/component/input/Button/Button";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import { useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";
import { Col } from "react-native-components";
import MainSlider from "module/main/component/core/MainSlider";

const HomePage = (): JSX.Element => {
    const setWalletState = useSetRecoilState(walletState);
    return (
        <BasePage appearance="light" showIcons>
            <MainSlider />
            <Col style={{ paddingHorizontal: 20 }}>
                <Button onPress={() => setWalletState((state) => ({ ...state, isAuthenticated: false }))}>Log out</Button>
            </Col>
        </BasePage>
    );
};

export default HomePage;
