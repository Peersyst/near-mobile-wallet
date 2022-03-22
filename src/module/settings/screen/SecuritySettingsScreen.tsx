import { translate } from "locale";
import Button from "module/common/component/input/Button/Button";
import BaseSecondaryScreen from "module/common/component/layout/BaseSecondaryScreen/BaseSecondaryScreen";
import { BottomTabScreenNavigatonProps } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup.types";
import { MainScreens } from "module/main/MainNavigatorGroup";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import walletState from "module/wallet/state/WalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useEffect } from "react";
import { Col, useToast } from "react-native-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { MainStackParamsList } from "stack-navigator";
import pinConfirmedState from "../state/PinConfirmedState";

const SecuritySettingsScreen = ({ navigation }: BottomTabScreenNavigatonProps): JSX.Element => {
    const setWalletState = useSetRecoilState(walletState);
    const {
        state: { pin },
    } = useCreateWallet();
    const [pinConfirmed, setPinConfirmedState] = useRecoilState(pinConfirmedState);
    const { showToast } = useToast();

    useEffect(() => {
        const updatePin = async () => {
            const storedWallet = await WalletStorage.get();
            await WalletStorage.set({ ...storedWallet!, pin: pin! });
            setPinConfirmedState({ pinConfirmed: false, hasNewPin: false });
            showToast(translate("pin_updated_successfully"), { type: "success" });
        };
        if (pinConfirmed.pinConfirmed && pinConfirmed.hasNewPin) updatePin();
    }, [pinConfirmed]);

    const navigate = (link: keyof MainStackParamsList) => {
        navigation.navigate(link);
    };

    return (
        <BaseSecondaryScreen navigation={navigation} title={translate("security_settings")} back={true}>
            <Col gap={20}>
                <Button onPress={() => navigate(MainScreens.UPDATE_PIN)} fullWidth variant="outlined">
                    {translate("change_passcode")}
                </Button>
                <Button
                    fullWidth
                    style={{ backgroundColor: "red" }}
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
                    DELETE ACCOUNT
                </Button>
            </Col>
        </BaseSecondaryScreen>
    );
};

export default SecuritySettingsScreen;
