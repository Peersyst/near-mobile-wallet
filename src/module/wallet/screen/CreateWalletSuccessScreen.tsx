import { useEffect } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { defaultSettingsState } from "module/settings/state/SettingsState";
import createWalletState from "module/wallet/state/CreateWalletState";
import useImportWallets from "../hook/useImportWallets";
import { InteractionManager } from "react-native";
import { Col, Spinner } from "@peersyst/react-native-components";
import walletState from "../state/WalletState";
import ControllerFactory from "refactor/ui/adapter/ControllerFactory";
import useCreateWallet from "../hook/useCreateWallet";

const CreateWalletSuccessScreen = (): JSX.Element => {
    const setWalletState = useSetRecoilState(walletState);
    const resetCreateWalletState = useResetRecoilState(createWalletState);
    const importWallets = useImportWallets();
    const {
        state: { mnemonic, pin },
    } = useCreateWallet();

    useEffect(() => {
        const setStorage = async () => {
            setWalletState((state) => ({
                ...state,
                loading: true,
                hasWallet: true,
                isAuthenticated: true,
            }));

            // Do not await so the user can enter the app directly with a loading state
            importWallets(defaultSettingsState.network);

            if (mnemonic && pin) {
                await ControllerFactory.authController.signUp(mnemonic, pin);
            }
            //After all clean createWalletState
            resetCreateWalletState();
        };
        setTimeout(() => {
            InteractionManager.runAfterInteractions(() => {
                setStorage();
            });
        }, 500);
    }, []);

    return (
        <Col flex={1} alignItems="center" justifyContent="center" gap="5%">
            <Spinner size="large" color="white" />
        </Col>
    );
};

export default CreateWalletSuccessScreen;
