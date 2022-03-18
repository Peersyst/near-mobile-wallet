import BaseSecondaryScreen from "module/common/component/layout/BaseSecondaryScreen/SecondaryPage";
import walletState from "module/wallet/state/WalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import { Button, Col } from "react-native-components";
import { useSetRecoilState } from "recoil";

const GeneralSettingsScreen = (): JSX.Element => {
    const setWalletState = useSetRecoilState(walletState);
    return (
        <BaseSecondaryScreen>
            <Col gap={20}>
                <Button onPress={() => setWalletState((state) => ({ ...state, isAuthenticated: false }))}>Log out</Button>
                <Button
                    onPress={async () => {
                        await WalletStorage.clear();
                        setWalletState((state) => ({
                            ...state,
                            isAuthenticated: false,
                            hasWallet: false,
                            name: undefined,
                            selectedAccount: undefined,
                        }));
                    }}
                >
                    Erase
                </Button>
            </Col>
        </BaseSecondaryScreen>
    );
};

export default GeneralSettingsScreen;
