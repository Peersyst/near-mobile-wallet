import { useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";
import Button from "module/common/component/input/Button/Button";
import { WalletStorage } from "module/wallet/WalletStorage";
import { translate } from "locale";
import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";

const SettingsScreen = (): JSX.Element => {
    const setWalletState = useSetRecoilState(walletState);
    return (
        <BaseMainScreen title={translate("settings")} back={true}>
            <Button onPress={() => setWalletState((state) => ({ ...state, isAuthenticated: false }))}>Log out</Button>
            <Button
                onPress={async () => {
                    await WalletStorage.clear();
                    setWalletState({ isAuthenticated: false, hasWallet: false, name: undefined });
                }}
            >
                Erase
            </Button>
        </BaseMainScreen>
    );
};

export default SettingsScreen;
