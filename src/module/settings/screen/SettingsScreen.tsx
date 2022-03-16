import { useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";
import Button from "module/common/component/input/Button/Button";
import { WalletStorage } from "module/wallet/WalletStorage";
import { translate } from "locale";
import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import SelectNetwork from "../components/core/SelectNetwork/SelectNetwork";
import CardBackgroundWrapper from "module/common/component/surface/CardBackgroundWrapper/CardBackgroundWrapper";

const SettingsScreen = (): JSX.Element => {
    const setWalletState = useSetRecoilState(walletState);

    return (
        <BaseMainScreen title={translate("settings")} back={false}>
            <CardBackgroundWrapper>
                <SelectNetwork />
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
            </CardBackgroundWrapper>
        </BaseMainScreen>
    );
};

export default SettingsScreen;
