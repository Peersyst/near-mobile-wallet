import { translate } from "locale";
import Button from "module/common/component/input/Button/Button";
import BaseSecondaryScreen from "module/common/component/layout/BaseSecondaryScreen/SecondaryPage";
import { BottomTabScreenNavigatonProps } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup.types";
import walletState from "module/wallet/state/WalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import { Col } from "react-native-components";
import { useSetRecoilState } from "recoil";

const GeneralSettingsScreen = ({ navigation }: BottomTabScreenNavigatonProps): JSX.Element => {
    const setWalletState = useSetRecoilState(walletState);
    return (
        <BaseSecondaryScreen navigation={navigation} title={translate("security_settings")} back={true}>
            <Col gap={20}>
                <Button
                    fullWidth
                    onPress={() => setWalletState((state) => ({ ...state, isAuthenticated: false }))}
                >
                    Log out
                </Button>
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
